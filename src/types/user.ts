import { z } from "zod";
import { userSchema } from "@/schemas/user";

export type User = z.infer<typeof userSchema>;
