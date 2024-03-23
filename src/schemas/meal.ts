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
  dateCreated: z.date(),
  location: z.string(),
  userId: z.string(),
});

export const mealInsertSchema = mealSchema.omit({
  id: true,
  dateCreated: true,
});
