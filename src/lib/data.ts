import { sql } from "@vercel/postgres";
import type { Meal } from "@/types/meal";

export async function getMeals() {
  const userId = "123e4567-e89b-12d3-a456-426655440000"; //todo haha

  const { rows } =
    await sql<Meal>`SELECT * FROM meal where user_id = ${userId}`;
  return rows;
}
