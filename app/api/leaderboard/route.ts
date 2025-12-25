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
    // Match the exact message you were seeing
    throw Object.assign(new Error("Access control exception"), { status: 401 });
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

  // If Moodle rejects token/permissions, surface a clearer error
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Moodle WS HTTP ${res.status}: ${txt.slice(0, 200)}`);
  }

  const json: any = await res.json();

  // Moodle often returns {exception, errorcode, message}
  if (json?.exception) {
    const msg =
      json?.message ||
      json?.errorcode ||
      "Moodle WS exception (token/permissions?)";
    throw new Error(msg);
  }

  return json as T;
}

function anonName(rank: number) {
  // Student A, Student B, ...
  return `Student ${String.fromCharCode(65 + rank)}`;
}

export async function GET(req: NextRequest) {
  try {
    // Optional access control
    enforceAccessControl(req);

    const courseId = Number(process.env.SSCE_COURSE_ID || "9");

    // Your quiz IDs (from your links)
    const quizzes = [
      { subject: "Mathematics", quizid: 40 },
      { subject: "Physics", quizid: 41 },
      { subject: "Chemistry", quizid: 43 },
      { subject: "English", quizid: 44 },
      { subject: "Biology", quizid: 45 },
    ];

    // 1) Get enrolled users
    const enrolled = await moodleCall<MoodleUser[]>(
      "core_enrol_get_enrolled_users",
      { courseid: courseId }
    );

    // Keep only “real” users (avoid guest/service accounts)
    const users = enrolled.filter((u) => u?.id && u?.id > 1);

    // 2) For each quiz, compute top scores by best grade
    const resultsByQuiz = await Promise.all(
      quizzes.map(async (q) => {
        const grades = await Promise.all(
          users.map(async (u) => {
            // returns {grade: number|null} in many Moodle versions
            const r = await moodleCall<{ grade: number | null }>(
              "mod_quiz_get_user_best_grade",
              { quizid: q.quizid, userid: u.id }
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

        return { subject: q.subject, quizid: q.quizid, top };
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
