import { mealInsertSchema } from "@/schemas/meal";
import { MealDTO, MealInsert } from "@/types/meal";
import { sql } from "@vercel/postgres";

export async function createMeal(mealProperties: MealDTO) {
  const userId = "1"; //todo haha

  const meal = {
    ...mealProperties,
    userId,
  };

  mealInsertSchema.parse(meal);

  const { rows, fields } =
    await sql`INSERT INTO meal (name, calories, protein, carbs, fat, fiber, sugar, img, locaiton, userId) VALUES (${meal.name}, ${meal.calories}, ${meal.protein}, ${meal.carbs}, ${meal.fat}, ${meal.fiber} ${meal.sugar}, ${meal.img}, ${meal.location}, ${userId}`;
  return rows;
}
