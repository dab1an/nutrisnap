import { sql } from "@vercel/postgres";
import type { Meal } from "@/types/meal";

export async function getMeals() {
  const userId = "1"; //todo haha

  const { rows } =
    await sql<Meal>`SELECT * FROM meals WHERE userId = ${userId}`;
  return rows;
}
