import { CategoryCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
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
            data: {
                name: data.name,
                slug: data.slug
            }
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
}