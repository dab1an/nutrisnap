import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  date_created: z.date(),
  name: z.string(),
  username: z.string(),
});
