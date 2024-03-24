import { z } from "zod";

export const statSchema = z.object({
  total_calories: z
    .string()
    .regex(/^\d+$/)
    .transform((v) => parseInt(v, 10)),
  total_protein: z
    .string()
    .regex(/^\d+$/)
    .transform((v) => parseInt(v, 10)),
  total_carbs: z
    .string()
    .regex(/^\d+$/)
    .transform((v) => parseInt(v, 10)),
  total_fat: z
    .string()
    .regex(/^\d+$/)
    .transform((v) => parseInt(v, 10)),
  total_fiber: z
    .string()
    .regex(/^\d+$/)
    .transform((v) => parseInt(v, 10)),
  total_sugar: z
    .string()
    .regex(/^\d+$/)
    .transform((v) => parseInt(v, 10)),
  total_meals: z
    .string()
    .regex(/^\d+$/)
    .transform((v) => parseInt(v, 10)),
});

export const statsSchema = z.object({
  current: statSchema,
  previous: statSchema,
});
