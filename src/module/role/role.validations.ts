import {z} from "zod"

export const roleSchema = z.object({
    name: z.string(),
    description: z.string()
})

export type RoleInput = z.infer<typeof roleSchema>;