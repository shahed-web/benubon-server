import {z} from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(2),
    slug: z.string(),
    parentId: z.number().optional()
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;