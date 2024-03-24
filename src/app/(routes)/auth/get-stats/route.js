import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const period = searchParams.get("period");
  try {
    if (!email) {
      return NextResponse.json(
        { error: "Missing postId or username or comment" },
        { status: 400 }
      );
    }

    const res = await sql`SELECT
    date_trunc(${period}::text, created_at) AS period,
    SUM(calories) AS total_calories,
    SUM(sugar) AS total_sugar,
    SUM(protein) AS total_protein,
    SUM(carbs) AS total_carbs,
    SUM(fat) AS total_fat,
    SUM(fiber) AS total_fiber,
    LEAD(SUM(calories), 1) OVER (ORDER BY date_trunc(${period}::text, created_at)) AS prev_period_calories,
    LEAD(SUM(sugar), 1) OVER (ORDER BY date_trunc(${period}::text, created_at)) AS prev_period_sugar,
    LEAD(SUM(protein), 1) OVER (ORDER BY date_trunc(${period}::text, created_at)) AS prev_period_protein,
    LEAD(SUM(carbs), 1) OVER (ORDER BY date_trunc(${period}::text, created_at)) AS prev_period_carbs,
    LEAD(SUM(fat), 1) OVER (ORDER BY date_trunc(${period}::text, created_at)) AS prev_period_fat,
    LEAD(SUM(fiber), 1) OVER (ORDER BY date_trunc(${period}::text, created_at)) AS prev_period_fiber
FROM
    meals
WHERE
    user_email = ${email}
GROUP BY
    date_trunc(${period}::text, created_at), meals.created_at
ORDER BY
    date_trunc(${period}::text, created_at) DESC;`;
    return NextResponse.json({ meals: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
