import {z} from "zod";

const StatusSchema = z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]);

export const categorySchema = z.object({
    name: z.string().min(2),
    parentId: z.number().optional(),
    status: StatusSchema.optional(),
    description: z.string().optional()
})

export type CategoryInput = z.infer<typeof categorySchema>;

export const completeUploadSchema = z.object({
  id: z.number().int().positive(),

  files: z.array(
      z.object({
        fileName: z.string().min(1),
        objectKey: z.string().min(1),
        mimeType: z.string().min(1),
        size: z.number(),
      })
    ).min(1).max(5),
});

export type CompleUploadSchema = z.infer<typeof completeUploadSchema>

export const replaceCategorySchema = z.object({
    newMediaId: z.string()
})