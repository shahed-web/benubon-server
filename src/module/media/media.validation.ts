import { z } from "zod";

export const completeUploadSchema = z.object({
  id: z.number().int().positive(),

  files: z.array(
      z.object({
        fileName: z.string().min(1),
        objectKey: z.string().min(1),
        mimeType: z.string().min(1),
        size: z.number().optional(),
      })
    ).min(1).max(5),
});