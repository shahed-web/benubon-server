import {z} from "zod"

export const authSchema = z.object({
    name: z.string().optional(),
    email: z.string().min(2),
    password: z.string()
})

export type AuthInput = z.infer<typeof authSchema>;