import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import type { Meal } from "@/types/meal";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email"); //should be gotten from the user's session

  try {
    if (!email) {
      return NextResponse.json(
        { error: "Missing postId or username or comment" },
        { status: 400 }
      );
    }

    const res =
      await sql<Meal>`SELECT * FROM meals where user_email = ${email} ORDER BY created_at DESC;`;
    return NextResponse.json({ meals: res }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
