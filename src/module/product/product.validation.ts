import {z} from "zod";


const imageSchema = z.object({
    publicId: z.string(),
    url: z.string(),
    width: z.number(),
    height: z.number(),
    position: z.number(),
    altText: z.string(),
})

const priceSchema = z.object({
    create: z.array(
        z.object({
            currency: z.string(),
            amount: z.number().positive(),
            minQty: z.number().int().positive(),
        })
    )
})

const inventorySchema = z.object({
    create: z.object({
        quantity: z.number().int(),
        warehouse: z.string()
    })
})

const variantSchema = z.object({
    create: z.array(
        z.object({
            name: z.string().min(2),
            material: z.string(),
            size: z.string(),
            color: z.string(),
            weightKg: z.float32().nullable(),
            lengthCm: z.float32().nullable(),
            widthCm: z.float32().nullable(),
            heightCm: z.float32().nullable(),
            prices: priceSchema,
            inventory: inventorySchema      
        })
    )
})

const categoriesSchema = z.object({
    connect: z.array(z.object({id: z.number()}))
})

export const productSchema = z.object({
    name: z.string().min(2),
    sku: z.string().min(2),
    slug: z.string(),
    description: z.string(),
    hsCode: z.string(),
    moq: z.string(),
    isInternational: z.boolean(),
    status: z.enum(["DRAFT", "ACTIVE"]),
    
    categories: categoriesSchema,
    variants: variantSchema,
    // artisan: artisanSchema.optional()
})

export type ProductInput = z.infer<typeof productSchema>;