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
 * If not set, endpoint is public.
 */
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
  params: Record<string, any>
): Promise<T> {
  const base = requireEnv("MOODLE_BASE_URL").replace(/\/$/, "");
  const token = requireEnv("MOODLE_WS_TOKEN");
  const url = `${base}/webservice/rest/server.php`;

  const body = new URLSearchParams();
  body.set("wstoken", token);
  body.set("moodlewsrestformat", "json");
  body.set("wsfunction", wsfunction);

  for (const [k, v] of Object.entries(params)) {
    if (Array.isArray(v)) {
      v.forEach((item, idx) => body.append(`${k}[${idx}]`, String(item)));
    } else {
      body.set(k, String(v));
    }
  }

  const res = await fetch(url, { method: "POST", body });

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
  return `Student ${String.fromCharCode(65 + rank)}`; // Student A, B, C...
}

/**
 * Build a map from course module id (cmid) -> quiz instance id (quizid)
 * using core_course_get_contents (more reliable than relying on cmid being in quizzes list).
 */
async function getCmidToQuizId(courseId: number) {
  const contents = await moodleCall<any[]>("core_course_get_contents", {
    courseid: courseId,
  });

  const map = new Map<number, number>();

  for (const section of contents ?? []) {
    for (const mod of section?.modules ?? []) {
      // For a quiz module:
      // - mod.id is usually the cmid
      // - mod.instance is the quizid (activity instance id)
      if (mod?.modname === "quiz" && typeof mod?.id === "number") {
        const cmid = mod.id;
        const quizid = Number(mod.instance);
        if (Number.isFinite(quizid)) map.set(cmid, quizid);
      }
    }
  }

  return map;
}

export async function GET(req: NextRequest) {
  try {
    enforceAccessControl(req);

    const courseId = Number(process.env.SSCE_COURSE_ID || "9");

    // These are the course module ids (cmid) from /mod/quiz/view.php?id=XX
    const quizModules = [
      { subject: "Mathematics", cmid: 40 },
      { subject: "Physics", cmid: 41 },
      { subject: "Chemistry", cmid: 43 },
      { subject: "English", cmid: 44 },
      { subject: "Biology", cmid: 45 },
    ];

    // 1) Map cmid -> quizid safely
    const cmidToQuizId = await getCmidToQuizId(courseId);

    // 2) Enrolled users (to filter out non-enrolled users from grades if needed)
    const enrolled = await moodleCall<MoodleUser[]>(
      "core_enrol_get_enrolled_users",
      { courseid: courseId }
    );

    const enrolledIds = new Set(
      (enrolled ?? []).filter((u) => u?.id && u.id > 1).map((u) => u.id)
    );

    // 3) For each quiz, fetch grades in ONE call (fast + fewer rate-limit issues)
    const resultsByQuiz = await Promise.all(
      quizModules.map(async (q) => {
        const quizid = cmidToQuizId.get(q.cmid);

        if (!quizid) {
          return {
            subject: q.subject,
            quizid: -1,
            top: [],
            note: `Could not map cmid ${q.cmid} to a quiz instance.`,
          };
        }

        // Returns grades for users who have attempted (site dependent)
        // Typically: { grades: [{ userid, grade }, ...] }
        const gradeResp = await moodleCall<any>("mod_quiz_get_user_grades", {
          quizid,
        });

        const grades: Array<{ userid: number; grade: number | null }> =
          gradeResp?.grades ?? [];

        const top = grades
          .filter(
            (g) =>
              enrolledIds.has(g.userid) && typeof g.grade === "number" // attempted + enrolled
          )
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

    // Cache a bit to reduce repeated Moodle hits (helpful on Vercel)
    return NextResponse.json(
      { generatedAt: new Date().toISOString(), resultsByQuiz },
      {
        status: 200,
        headers: {
          // Adjust if you want fresher data; this is a nice default.
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (e: any) {
    const status = typeof e?.status === "number" ? e.status : 500;
    return NextResponse.json(
      { error: e?.message || "Failed to build leaderboard" },
      { status }
    );
  }
}
