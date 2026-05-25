import { z } from "zod";

export const artisanSchema = z.object({
  id: z.number().int().positive(),

  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name is too long"),

  location: z
    .string()
    .max(255, "Location is too long")
    .nullable()
    .optional(),

  materials: z
    .array(z.string().min(1))
    .default([]),

  monthlyCapacity: z
    .number()
    .int()
    .nonnegative()
    .nullable()
    .optional(),

  reliabilityScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .nullable()
    .optional(),

  notes: z
    .string()
    .nullable()
    .optional(),

  createdAt: z.date(),

  updatedAt: z.date(),

  deletedAt: z
    .date()
    .nullable()
    .optional(),
});

export const createArtisanSchema = artisanSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const updateArtisanSchema = createArtisanSchema.partial();

export type Artisan = z.infer<typeof artisanSchema>;
export type CreateArtisanInput = z.infer<typeof createArtisanSchema>;
export type UpdateArtisanInput = z.infer<typeof updateArtisanSchema>;