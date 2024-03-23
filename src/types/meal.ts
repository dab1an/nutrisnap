import z from "zod";
import { MealDTOSchema, mealInsertSchema, mealSchema } from "@/schemas/meal";

export type Meal = z.infer<typeof mealSchema>;
export type MealInsert = z.infer<typeof mealInsertSchema>;
export type MealDTO = z.infer<typeof MealDTOSchema>;
