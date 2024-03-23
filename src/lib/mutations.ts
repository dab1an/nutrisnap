import { MealInsert } from "@/types/meal";
import { sql } from "@vercel/postgres";

export async function createMeal(meal: MealInsert) {
  const userId = "1"; //todo haha

  const { rows, fields } =
    await sql`INSERT INTO meals (name, calories, protein, carbs, fat, sugar, img, locaiton, userId) VALUES (${meal.name}, ${meal.calories}, ${meal.protein}, ${meal.carbs}, ${meal.fat}, ${meal.sugar}, ${meal.img}, ${meal.location}, ${userId}`;
  return rows;
}
