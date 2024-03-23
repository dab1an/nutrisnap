import { sql } from "@vercel/postgres";
import type { Meal } from "@/types/meal";

export async function getMeals() {
  const { rows } = await sql<Meal>`SELECT * FROM meals`;
  return rows;
}
