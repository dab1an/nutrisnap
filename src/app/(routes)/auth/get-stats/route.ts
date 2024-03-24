import { statsSchema } from "@/schemas/queries";
import { Stat, Stats } from "@/types/queries";
import { sql } from "@vercel/postgres";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const period = searchParams.get("period") ?? "day";
  console.log(email, period);

  try {
    if (!email) {
      return NextResponse.json(
        { error: "Missing postId or username or comment" },
        { status: 400 }
      );
    }

    const { rows: current } = await sql<Stat>`
      WITH current_period AS (
        SELECT
          SUM(calories) AS total_calories,
          SUM(protein) AS total_protein,
          SUM(carbs) AS total_carbs,
          SUM(fat) AS total_fat,
          SUM(fiber) AS total_fiber,
          SUM(sugar) AS total_sugar,
          COUNT(*) AS total_meals
        FROM meals
        WHERE
          created_at >= DATE_TRUNC(${period}::text, CURRENT_TIMESTAMP) -- Start of the current day
      )
      SELECT * FROM current_period;
    `;

    let previous = null;

    try {
      switch (period) {
        case "day":
          previous = await sql<Stat>`
    WITH previous_period AS (
        SELECT
            SUM(calories) AS total_calories,
            SUM(protein) AS total_protein,
            SUM(carbs) AS total_carbs,
            SUM(fat) AS total_fat,
            SUM(fiber) AS total_fiber,
            SUM(sugar) AS total_sugar,
            COUNT(*) AS total_meals
        FROM meals
        WHERE
            created_at >= DATE_TRUNC('day', CURRENT_TIMESTAMP) - INTERVAL '1 day' AND
            created_at < CURRENT_TIMESTAMP - INTERVAL '1 day'
    )
    SELECT * FROM previous_period;`;
          break;
        case "week":
          previous = await sql<Stat>`

          WITH previous_period AS (
            SELECT
                SUM(calories) AS total_calories,
                SUM(protein) AS total_protein,
                SUM(carbs) AS total_carbs,
                SUM(fat) AS total_fat,
                SUM(fiber) AS total_fiber,
                SUM(sugar) AS total_sugar,
                COUNT(*) AS total_meals
            FROM meals
            WHERE
                created_at >= DATE_TRUNC('week', CURRENT_TIMESTAMP) - INTERVAL '1 week' AND
                created_at < CURRENT_TIMESTAMP - INTERVAL '1 week'
        )
        SELECT * FROM previous_period;`;

          break;
        case "month":
          previous = await sql<Stat>`

          WITH previous_period AS (
            SELECT
                SUM(calories) AS total_calories,
                SUM(protein) AS total_protein,
                SUM(carbs) AS total_carbs,
                SUM(fat) AS total_fat,
                SUM(fiber) AS total_fiber,
                SUM(sugar) AS total_sugar,
                COUNT(*) AS total_meals
            FROM meals
            WHERE
                created_at >= DATE_TRUNC('month', CURRENT_TIMESTAMP) - INTERVAL '1 month' AND
                created_at < CURRENT_TIMESTAMP - INTERVAL '1 month'
        )
        SELECT * FROM previous_period;`;

          break;
      }
    } catch (error: any) {
      throw new Error("Error fetching previous period stats", error.message);
    }

    previous = previous?.rows[0];
    const res = { current: current[0], previous } as Stats;
    const parsedRes = statsSchema.parse(res);
    console.log(res);
    return NextResponse.json({ data: parsedRes }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
