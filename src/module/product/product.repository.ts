import { ProductCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { CompleteUploadRequest } from "../media/media.type";
import { OrderBy } from "./product.types";

export class ProductRepository {
    async createProduct(data: ProductCreateInput) {
        return await prisma.product.create({
            data: data 
        })
    }

    async getProducts(skip: number, limit=10, orderBy?: OrderBy) {
        const [products, total] = await prisma.$transaction([
            prisma.product.findMany({
                skip: skip,
                take: limit,
                orderBy: orderBy!,
                include: {
                    variants: {
                        select: {
                            id: true,
                            name: true,
                            material: true,
                            size: true,
                            color: true,
                            weightKg: true,
                            lengthCm: true,
                            widthCm: true,
                            heightCm: true,
                            prices: {
                                select: {
                                    id: true,
                                    currency: true,
                                    amount: true,
                                    minQty: true,
                                }
                            },
                            inventory: {
                                select: {
                                    id: true,
                                    quantity: true,
                                    warehouse: true,
                                }
                            }
                        }
                    }
                },
            }),
            prisma.product.count()
        ])
        return {
            products,
            total,
        }
    } 

    async getProductById(id: number) {
        return await prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                    categories: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    variants: {
                        select: {
                            id: true,
                            name: true,
                            material: true,
                            size: true,
                            color: true,
                            weightKg: true,
                            lengthCm: true,
                            widthCm: true,
                            heightCm: true,
                            prices: {
                                select: {
                                    id: true,
                                    currency: true,
                                    amount: true,
                                    minQty: true,
                                }
                            },
                            inventory: {
                                select: {
                                    id: true,
                                    quantity: true,
                                    warehouse: true,
                                }
                            }
                        }
                    }
                },
        })
    }

    async softDeleteProduct(id: number) {
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                isSoftDelete: true
            }
        })
    }

    async retrieveProduct(id: number) {
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                isSoftDelete: false
            }
        })
    }

    async deleteProduct(id: number) {
        await prisma.product.delete({
            where: {
                id: id
            }
        })
    }

    async completeUpload(payload: CompleteUploadRequest) {

        return prisma.$transaction(
        async (tx) => {

            const product = await tx.product.findUnique({
                where: {
                id: payload.id,
                },
                select: {
                id: true,
                },
            });

            if (!product) {
            throw new Error(
                "Product not found"
            );
            }

            const mediaRecords = [];

            
            for (const file of payload.files) {
            const media = await tx.media.create({
                data: {
                    fileName: file.fileName,
                    objectKey: file.objectKey,
                    mimeType:file.mimeType,
                    size: file.size ?? null,
                },
                });

            mediaRecords.push(media);

            await tx.productImage.create({
                data: {
                productId: payload.id,
                mediaId: media.id,
                },
            });
            }

            await tx.product.update({
            where: {
                id: payload.id,
            },
            data: {
                status: "ACTIVE",
            },
            });

            return {
            productId: payload.id,
            uploadedImages: mediaRecords.length,
            media: mediaRecords,
            };
        }
        );
    }
}