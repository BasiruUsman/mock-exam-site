import { NextResponse } from "next/server";

export async function GET() {
  try {
    const base = process.env.MOODLE_BASE_URL!;
    const token = process.env.MOODLE_WS_TOKEN!;

    const res = await fetch(
      `${base}/webservice/rest/server.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          wstoken: token,
          wsfunction: "core_webservice_get_site_info",
          moodlewsrestformat: "json",
        }),
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Test failed" },
      { status: 500 }
    );
  }
}
