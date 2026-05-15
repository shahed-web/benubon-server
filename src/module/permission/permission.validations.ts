import {z} from "zod"

export const permissionSchema = z.object({
    name: z.string(),
    description: z.string()
})

export type PermissionInput = z.infer<typeof permissionSchema>;