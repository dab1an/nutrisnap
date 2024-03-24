import { mealInsertSchema } from "@/schemas/meal";
import { MealDTO, MealInsert } from "@/types/meal";
import { sql } from "@vercel/postgres";

const user_email = "jschuster8765@gmail.com"; //todo haha

export async function createMeal(mealProperties: MealDTO) {
  const meal = {
    ...mealProperties,
    user_email,
  };

  mealInsertSchema.parse(meal);

  const { rows, fields } =
    await sql`INSERT INTO meals (name, calories, protein, carbs, fat, fiber, sugar, img, locaiton, user_email) VALUES (${meal.name}, ${meal.calories}, ${meal.protein}, ${meal.carbs}, ${meal.fat}, ${meal.fiber} ${meal.sugar}, ${meal.img}, ${meal.location}, ${user_email}`;
  return rows;
}
