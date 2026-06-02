import { CategoryCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

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

    async getCategories() {
        return await prisma.category.findMany({
            where: {parentId: null},
            include: {
                children: {
                    include: {
                        children: true
                    }
                }
            }
        })
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
                isActive: false,
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
                isActive: true   
            }
        })
    }

    async viewCategory(id:number) {
        return await prisma.category.findUnique({
            where: {
                id: id
            }
        })
    }
}