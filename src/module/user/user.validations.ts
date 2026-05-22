import {z} from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string(),
  role: z.string().optional(),
  isActive: z.boolean(),
});

export type UserInput = z.infer<typeof userSchema>;