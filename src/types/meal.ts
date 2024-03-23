import z from "zod";
import { mealInsertSchema, mealSchema } from "@/schemas/meal";

export type Meal = z.infer<typeof mealSchema>;
export type MealInsert = z.infer<typeof mealInsertSchema>;
