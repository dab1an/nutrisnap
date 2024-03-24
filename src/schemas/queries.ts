import { z } from "zod";

export const statSchema = z.object({
  total_calories: z.number(),
  total_protein: z.number(),
  total_carbs: z.number(),
  total_fat: z.number(),
  total_fiber: z.number(),
  total_sugar: z.number(),
  total_meals: z.number(),
});

export const statsSchema = z.object({
  current: statSchema,
  previous: statSchema,
});
