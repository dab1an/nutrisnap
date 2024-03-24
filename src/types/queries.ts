import { z } from "zod";
import { statSchema, statsSchema } from "@/schemas/queries";

export type Stat = z.infer<typeof statSchema>;
export type Stats = z.infer<typeof statsSchema>;
