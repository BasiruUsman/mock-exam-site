import { NextResponse } from "next/server";

type MoodleUser = {
  id: number;
  fullname?: string;
};

async function moodleCall<T>(
  wsfunction: string,
  params: Record<string, string | number>
): Promise<T> {
  const base = process.env.MOODLE_BASE_URL!;
  const token = process.env.MOODLE_WS_TOKEN!;
  const url = `${base}/webservice/rest/server.php`;

  const body = new URLSearchParams({
    wstoken: token,
    moodlewsrestformat: "json",
    wsfunction,
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });

  const res = await fetch(url, { method: "POST", body });
  if (!res.ok) throw new Error(`Moodle WS failed: ${res.status}`);

  const json = await res.json();

  // Moodle often returns {exception, errorcode, message}
  if (json?.exception) {
    throw new Error(json?.message || "Moodle WS exception");
  }

  return json as T;
}

function anonName(rank: number) {
  // Student A, Student B, ...
  return `Student ${String.fromCharCode(65 + rank)}`;
}

export async function GET() {
  try {
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

    // Keep only “real” users (avoid the service account, etc.)
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
    return NextResponse.json(
      { error: e?.message || "Failed to build leaderboard" },
      { status: 500 }
    );
  }
}
