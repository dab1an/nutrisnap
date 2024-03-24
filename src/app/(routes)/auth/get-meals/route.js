import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    if (!email) {
      return NextResponse.json(
        { error: "Missing postId or username or comment" },
        { status: 400 }
      );
    }

    const res =
      await sql`SELECT * FROM meals where user_email = ${email} ORDER BY created_at DESC;`;
    return NextResponse.json({ meals: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
