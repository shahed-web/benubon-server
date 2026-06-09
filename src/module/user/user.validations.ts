import {z} from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string(),
  roleId: z.string().optional(),
  password: z.string(),
  isActive: z.boolean(),
});

export type UserInput = z.infer<typeof userSchema>;