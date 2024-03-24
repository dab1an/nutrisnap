import z from "zod";

export const mealSchema = z.object({
  id: z.string(),
  name: z.string(),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  fiber: z.number(),
  sugar: z.number(),
  img: z.string(),
  created_at: z.date(),
  location: z.string(),
  user_email: z.string(),
});

export const mealInsertSchema = mealSchema.omit({
  id: true,
  created_at: true,
});

export const MealDTOSchema = mealInsertSchema.omit({
  user_email: true,
});
