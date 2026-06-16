import { CategoryCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../utils/errors/app-error";
import { CompleteUploadRequest } from "../media/media.type";
import { OrderBy } from "./category.types";

export class CategoryRepository {
    async categorySlug(slug: string) {
        return await prisma.category.findUnique({
            where: {
                slug: slug
            }
        })
    }

    async createCategory(data: CategoryCreateInput) {
        return await prisma.category.create({
            data: data
        })
    }

    async getCategories(skip: number, limit: number, orderBy: OrderBy) { 
            const [categories, total] = await prisma.$transaction([
                prisma.category.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: orderBy!,
                    include: {
                        children: {
                            include: {
                                children: true
                            }
                        },
                        categoryImages: {
                            include: {
                                media: true
                            }
                        }
                    }
                }),
            prisma.category.count()
        ])
        return {categories, total}
    }

    // folliwng is unused
    async getParentCategoriesOnly() { 
            const [categories, total] = await prisma.$transaction([
                prisma.category.findMany({
                where: {parentId: null},
                include: {
                    children: {
                        include: {
                            children: true
                        }
                    }
                }
            }),
            prisma.category.count()
        ])
        return {categories, total}
    }
    async updateCategory(id:number, data: CategoryCreateInput) {
        return await prisma.category.update({
            where: {
                id: id
            },
            data: data
        })
    }

    async deleteCategory(id:number) {
        await prisma.category.delete({
            where: {
                id: id
            }
        })
    }

    async softDeleteCategory(id:number) {
        await prisma.category.update({
            where: {
                id: id
            },
            data: {
                isSoftDelete: false,
                deletedAt: new Date(),
            }
        })
    }

    async retriveCategory(id:number) {
        return await prisma.category.update({
            where: {
                id: id
            },
            data: {
                isSoftDelete: true   
            }
        })
    }

    async viewCategory(id:number) {
        return await prisma.category.findUnique({
            where: {
                id: id
            },
            include: {
                children: {
                    include: {
                        children: true
                    }
                }
            }
        })
    }

    async categoryOptions() {
        return await prisma.category.findMany({
            where: { parentId: null },
            select: {
                id: true,
                name: true,
                slug: true
            }
        })
    }

    async completeUpload(payload: CompleteUploadRequest) {

    return prisma.$transaction(
        async (tx) => {

        const category = await tx.category.findUnique({
            where: {
                id: payload.id,
            },
            select: {
                id: true,
            },
            });

        if (!category) {
            throw new NotFoundError(
            "Category not found"
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

            await tx.categoryImage.create({
            data: {
                categoryId: payload.id,
                mediaId: media.id,
            },
            });
        }

        await tx.category.update({
            where: {
            id: payload.id,
            },
            data: {
            status: "ACTIVE",
            },
        });

        return {
            categoryId: payload.id,
            uploadedImages: mediaRecords.length,
            media: mediaRecords,
        };
        }
    );
    }
}