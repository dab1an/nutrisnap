import z from "zod";
import { mealSchema } from "@/schemas/meal";

export type Meal = z.infer<typeof mealSchema>;
