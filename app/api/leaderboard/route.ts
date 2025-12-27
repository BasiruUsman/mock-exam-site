import { NextRequest, NextResponse } from "next/server";

type MoodleUser = {
  id: number;
  fullname?: string;
};

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

/**
 * Optional API protection.
 * If LEADERBOARD_SECRET is set, callers must send:
 *   Authorization: Bearer <LEADERBOARD_SECRET>
 * If LEADERBOARD_SECRET is NOT set, the API is public.
 */
function enforceAccessControl(req: NextRequest) {
  const secret = process.env.LEADERBOARD_SECRET;
  if (!secret) return;

  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${secret}`) {
    // Make this message distinct from Moodle's "Access control exception"
    throw Object.assign(new Error("Unauthorized (invalid leaderboard secret)"), {
      status: 401,
    });
  }
}

async function moodleCall<T>(
  wsfunction: string,
  params: Record<string, any>
): Promise<T> {
  const base = requireEnv("MOODLE_BASE_URL").replace(/\/$/, "");
  const token = requireEnv("MOODLE_WS_TOKEN");
  const url = `${base}/webservice/rest/server.php`;

  // Moodle REST expects repeated keys for arrays; URLSearchParams handles this if we append.
  const body = new URLSearchParams();
  body.set("wstoken", token);
  body.set("moodlewsrestformat", "json");
  body.set("wsfunction", wsfunction);

  for (const [k, v] of Object.entries(params)) {
    if (Array.isArray(v)) {
      // Moodle style: courseids[0]=9, courseids[1]=...
      v.forEach((item, idx) => body.append(`${k}[${idx}]`, String(item)));
    } else {
      body.set(k, String(v));
    }
  }

  const res = await fetch(url, { method: "POST", body });

  // Moodle often returns JSON even on errors, but not always
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    const txt = await res.text().catch(() => "");
    throw new Error(`Moodle WS HTTP ${res.status}: ${txt.slice(0, 200)}`);
  }

  if (!res.ok) {
    throw new Error(
      `Moodle WS HTTP ${res.status}: ${JSON.stringify(json).slice(0, 300)}`
    );
  }

  if (json?.exception) {
    throw new Error(json?.message || json?.errorcode || "Moodle WS exception");
  }

  return json as T;
}

function anonName(rank: number) {
  // Student A, Student B, ...
  return `Student ${String.fromCharCode(65 + rank)}`;
}

export async function GET(req: NextRequest) {
  try {
    enforceAccessControl(req);

    const courseId = Number(process.env.SSCE_COURSE_ID || "9");

    // IMPORTANT:
    // These numbers come from /mod/quiz/view.php?id=XX
    // That "id" is the *course module id (cmid)*, not the quiz id.
    const quizModules = [
      { subject: "Mathematics", cmid: 40 },
      { subject: "Physics", cmid: 41 },
      { subject: "Chemistry", cmid: 43 },
      { subject: "English", cmid: 44 },
      { subject: "Biology", cmid: 45 },
    ];

    // 1) Get quizzes in the course so we can map cmid -> quizid
    // Requires: mod_quiz_get_quizzes_by_courses
    const quizByCourse = await moodleCall<any>(
      "mod_quiz_get_quizzes_by_courses",
      { courseids: [courseId] }
    );

    // Moodle response can vary by version/site:
    // commonly { quizzes: [...] } or [{ id: courseId, quizzes: [...] }]
    const quizzes: Array<{ id: number; cmid?: number; name?: string }> =
      quizByCourse?.quizzes ??
      quizByCourse?.[0]?.quizzes ??
      [];

    const cmidToQuizId = new Map<number, number>();
    for (const q of quizzes) {
      if (typeof q?.cmid === "number" && typeof q?.id === "number") {
        cmidToQuizId.set(q.cmid, q.id);
      }
    }

    // 2) Get enrolled users
    const enrolled = await moodleCall<MoodleUser[]>(
      "core_enrol_get_enrolled_users",
      { courseid: courseId }
    );

    // Keep only “real” users (avoid guest/service accounts)
    const users = enrolled.filter((u) => u?.id && u.id > 1);

    // 3) For each quiz, compute top scores by best grade
    const resultsByQuiz = await Promise.all(
      quizModules.map(async (q) => {
        const quizid = cmidToQuizId.get(q.cmid);

        // If mapping fails, return empty but don't crash the whole endpoint
        if (!quizid) {
          return { subject: q.subject, quizid: -1, top: [] };
        }

        const grades = await Promise.all(
          users.map(async (u) => {
            const r = await moodleCall<{ grade: number | null }>(
              "mod_quiz_get_user_best_grade",
              { quizid, userid: u.id }
            );

            return {
              userid: u.id,
              grade: typeof r?.grade === "number" ? r.grade : null,
            };
          })
        );

        const top = grades
          .filter((g) => typeof g.grade === "number")
          .sort((a, b) => (b.grade ?? 0) - (a.grade ?? 0))
          .slice(0, 10)
          .map((g, idx) => ({
            rank: idx + 1,
            name: anonName(idx), // privacy-safe
            subject: q.subject,
            score: Math.round((g.grade ?? 0) * 10) / 10, // 1 decimal
          }));

        return { subject: q.subject, quizid, top };
      })
    );

    return NextResponse.json(
      { generatedAt: new Date().toISOString(), resultsByQuiz },
      { status: 200 }
    );
  } catch (e: any) {
    const status = typeof e?.status === "number" ? e.status : 500;
    return NextResponse.json(
      { error: e?.message || "Failed to build leaderboard" },
      { status }
    );
  }
}
