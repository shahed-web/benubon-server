import { z } from "zod";

const BuyerStatusEnum = z.enum([
  "lead",
  "active",
  "dormant",
]);

const BuyerTypeEnum = z.enum([
  "retailer",
  "wholesaler",
  "brand",
  "agent",
]);

export const buyerSchema = z.object({
  name: z.string().optional(),
  email: z.string(),
  country: z.string().optional(),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  status: BuyerStatusEnum.default("lead"),
  type: BuyerTypeEnum,
  lastContact: z.string().optional(),
  notes: z.string().optional(),
});

export const updateBuyerSchema = buyerSchema.partial();

export type BuyerInput = z.infer<typeof buyerSchema>;

export type UpdateBuyerInput = z.infer<
  typeof updateBuyerSchema
>;