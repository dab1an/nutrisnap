import { mealInsertSchema } from "@/schemas/meal";
import { MealDTO, MealInsert } from "@/types/meal";
import { sql } from "@vercel/postgres";

const userId = "ca5b71dbc-4c6e-48cc-8bcf-5c955ee5cc97"; //todo haha

export async function createMeal(mealProperties: MealDTO) {
  const meal = {
    ...mealProperties,
    userId,
  };

  mealInsertSchema.parse(meal);

  const { rows, fields } =
    await sql`INSERT INTO meals (name, calories, protein, carbs, fat, fiber, sugar, img, locaiton, userId) VALUES (${meal.name}, ${meal.calories}, ${meal.protein}, ${meal.carbs}, ${meal.fat}, ${meal.fiber} ${meal.sugar}, ${meal.img}, ${meal.location}, ${userId}`;
  return rows;
}
