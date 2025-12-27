import { NextRequest, NextResponse } from "next/server";

type MoodleUser = { id: number; fullname?: string };

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

function enforceAccessControl(req: NextRequest) {
  const secret = process.env.LEADERBOARD_SECRET;
  if (!secret) return;

  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${secret}`) {
    throw Object.assign(new Error("Unauthorized (invalid leaderboard secret)"), {
      status: 401,
    });
  }
}

async function moodleCall<T>(
  wsfunction: string,
  params: Record<string, string | number>
): Promise<T> {
  const base = requireEnv("MOODLE_BASE_URL").replace(/\/$/, "");
  const token = requireEnv("MOODLE_WS_TOKEN");
  const url = `${base}/webservice/rest/server.php`;

  const body = new URLSearchParams({
    wstoken: token,
    moodlewsrestformat: "json",
    wsfunction,
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });

  const res = await fetch(url, { method: "POST", body });
  const json: any = await res.json().catch(async () => ({ raw: await res.text() }));

  if (!res.ok) {
    throw new Error(`Moodle WS HTTP ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  }
  if (json?.exception) {
    throw new Error(json?.message || json?.errorcode || "Moodle WS exception");
  }
  return json as T;
}

function anonName(rank: number) {
  return `Student ${String.fromCharCode(65 + rank)}`;
}

export async function GET(req: NextRequest) {
  try {
    enforceAccessControl(req);

    const courseId = Number(process.env.SSCE_COURSE_ID || "9");

    // These are *cmid*s from /mod/quiz/view.php?id=...
    const quizCmids = [
      { subject: "Mathematics", cmid: 40 },
      { subject: "Physics", cmid: 41 },
      { subject: "Chemistry", cmid: 43 },
      { subject: "English", cmid: 44 },
      { subject: "Biology", cmid: 45 },
    ];

    // Fetch quizzes in the course to map cmid -> quiz id
    const byCourses = await moodleCall<{
      quizzes: Array<{ id: number; course: number; cmid?: number; name: string }>;
    }>("mod_quiz_get_quizzes_by_courses", { courseids: [courseId] as any });

    // Some Moodle versions return an array per course; adjust if needed
    const quizzes = (byCourses as any)?.quizzes ?? (byCourses as any)?.[0]?.quizzes ?? [];
    const cmidToQuizId = new Map<number, number>();
    for (const q of quizzes) {
      if (typeof q.cmid === "number" && typeof q.id === "number") {
        cmidToQuizId.set(q.cmid, q.id);
      }
    }

    const enrolled = await moodleCall<MoodleUser[]>(
      "core_enrol_get_enrolled_users",
      { courseid: courseId }
    );
    const users = enrolled.filter((u) => u?.id && u.id > 1);

    const resultsByQuiz = await Promise.all(
      quizCmids.map(async ({ subject, cmid }) => {
        const quizid = cmidToQuizId.get(cmid);
        if (!quizid) {
          return { subject, quizid: -1, top: [] };
        }

        // WARNING: many calls. Consider limiting users or caching.
        const grades = await Promise.all(
          users.map(async (u) => {
            const r = await moodleCall<{ grade: number | null }>(
              "mod_quiz_get_user_best_grade",
              { quizid, userid: u.id }
            );
            return { userid: u.id, grade: typeof r?.grade === "number" ? r.grade : null };
          })
        );

        const top = grades
          .filter((g) => typeof g.grade === "number")
          .sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0))
          .slice(0, 10)
          .map((g, idx) => ({
            rank: idx + 1,
            name: anonName(idx),
            subject,
            score: Math.round((g.grade ?? 0) * 10) / 10,
          }));

        return { subject, quizid, top };
      })
    );

    return NextResponse.json({ generatedAt: new Date().toISOString(), resultsByQuiz });
  } catch (e: any) {
    const status = typeof e?.status === "number" ? e.status : 500;
    return NextResponse.json({ error: e?.message || "Failed to build leaderboard" }, { status });
  }
}
