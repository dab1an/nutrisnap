import { z } from "zod";

export const statSchema = z.object({
  total_calories: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform((v) => parseFloat(v)),
  total_protein: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform((v) => parseFloat(v)),
  total_carbs: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform((v) => parseFloat(v)),
  total_fat: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform((v) => parseFloat(v)),
  total_fiber: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform((v) => parseFloat(v)),
  total_sugar: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform((v) => parseFloat(v)),
  total_meals: z
    .string()
    .regex(/^\d+(\.\d+)?$/)
    .transform((v) => parseFloat(v)),
});

export const statsSchema = z.object({
  current: statSchema,
  previous: statSchema,
});
