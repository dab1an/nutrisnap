import { sql } from "@vercel/postgres";
import type { Meal } from "@/types/meal";

const userId = "dc21b61b-4d40-41ee-bb29-924f73b6cc00"; //todo haha

export async function getMeals() {
  const { rows } =
    await sql<Meal>`SELECT * FROM meal where user_id = ${userId} ORDER BY created_at DESC;`;
  return rows;
}

/**
 * Collect statistics for a given period of time about the user's dietary intake
 * @param period - the period of time to collect statistics for
 * @param userId - the ID of the user for which to retrieve statistics
 * @returns An object containing the total calories, protein, carbohydrates, fiber, fat, and sugar consumed by the user in the given period
 */
export async function getStats(period: "day" | "week" | "month" = "day") {
  const { rows, fields } = await sql`
  WITH current_period AS (
    SELECT
        SUM(calories) AS total_calories,
        SUM(protein) AS total_protein,
        SUM(carbs) AS total_carbs,
        SUM(fat) AS total_fat,
        SUM(fiber) AS total_fiber,
        SUM(sugar) AS total_sugar
        COUNT(*) AS total_meals
    FROM meal
    WHERE
        created_at >= DATE_TRUNC('day', CURRENT_TIMESTAMP) -- Start of the current day
        AND created_at < DATE_TRUNC('day', CURRENT_TIMESTAMP) + INTERVAL '1 ${period}'
        AND user_id = ${userId}
),
previous_period AS (
    SELECT
        SUM(calories) AS total_calories,
        SUM(protein) AS total_protein,
        SUM(carbs) AS total_carbs,
        SUM(fat) AS total_fat,
        SUM(fiber) AS total_fiber,
        SUM(sugar) AS total_sugar
        COUNT(*) AS total_meals
    FROM meal
    WHERE
        created_at >= DATE_TRUNC('day', CURRENT_TIMESTAMP) - INTERVAL '1 ${period}' -- Start of the previous day
        AND created_at < DATE_TRUNC('day', CURRENT_TIMESTAMP)
        AND user_id = ${userId}
)
SELECT
    current_period.total_calories AS current_calories,
    previous_period.total_calories AS previous_calories,
    current_period.total_protein AS current_protein,
    previous_period.total_protein AS previous_protein,
    current_period.total_carbs AS current_carbs,
    previous_period.total_carbs AS previous_carbs,
    current_period.total_fat AS current_fat,
    previous_period.total_fat AS previous_fat,
    current_period.total_fiber AS current_fiber,
    previous_period.total_fiber AS previous_fiber,
    current_period.total_sugar AS current_sugar,
    previous_period.total_sugar AS previous_sugar
    current_period.total_meals AS current_num_meals,
    previous_period.total_meals AS previous_num_meals
FROM
    current_period, previous_period;
`;

  return rows;
}
