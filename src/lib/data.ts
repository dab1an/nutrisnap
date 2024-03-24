import { sql } from "@vercel/postgres";
import type { Meal } from "@/types/meal";
import { createClient } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const userId = "a5b71dbc-4c6e-48cc-8bcf-5c955ee5cc97"; //todo haha

export async function getMeals() {
  noStore();

  const { rows } =
    await sql<Meal>`SELECT * FROM meals where user_id = ${userId} ORDER BY created_at DESC;`;
  return rows;
}

/**
 * Collect statistics for a given period of time about the user's dietary intake
 * @param period - the period of time to collect statistics for
 * @param userId - the ID of the user for which to retrieve statistics
 * @returns An object containing the total calories, protein, carbohydrates, fiber, fat, and sugar consumed by the user in the given period
 */
export async function getStats(interval: "day" | "week" | "month" = "day") {
  const client = await sql.connect();
  const period = "week";

  try {
    const { rows } = await client.query(
      `
    SELECT
    date_trunc($2::text, created_at) AS period,
    SUM(calories) AS total_calories,
    SUM(sugar) AS total_sugar,
    SUM(protein) AS total_protein,
    SUM(carbs) AS total_carbs,
    SUM(fat) AS total_fat,
    SUM(fiber) AS total_fiber,
    LEAD(SUM(calories), 1) OVER (ORDER BY date_trunc($2::text, created_at)) AS prev_period_calories,
    LEAD(SUM(sugar), 1) OVER (ORDER BY date_trunc($2::text, created_at)) AS prev_period_sugar,
    LEAD(SUM(protein), 1) OVER (ORDER BY date_trunc($2::text, created_at)) AS prev_period_protein,
    LEAD(SUM(carbs), 1) OVER (ORDER BY date_trunc($2::text, created_at)) AS prev_period_carbs,
    LEAD(SUM(fat), 1) OVER (ORDER BY date_trunc($2::text, created_at)) AS prev_period_fat,
    LEAD(SUM(fiber), 1) OVER (ORDER BY date_trunc($2::text, created_at)) AS prev_period_fiber
FROM
    meals
WHERE
    user_id = $1
GROUP BY
    date_trunc($2::text, created_at)
ORDER BY
    date_trunc($2::text, created_at) DESC;
      `,
      [userId, interval]
    );

    return rows;
  } finally {
    // await client.end();
  }
}
