import {z} from "zod";

export const categorySchema = z.object({
    name: z.string().min(2),
    parentSlug: z.string().optional(),
    description: z.string().optional()
})

export type CategoryInput = z.infer<typeof categorySchema>;