import { CATEGORY_MESSAGES, SLUG_MESSAGES } from "../../constant/messages";
import { prisma } from "../../lib/prisma";
import { AlreadyExistsError, NotFoundError } from "../../utils/errors/app-error";
import type { CreateCategoryInput } from "./category.validation";

export class CategoryService {
    async createCategory(data: CreateCategoryInput) {
        const slug = data.name.toLowerCase().replace(/\s+/g, '-');
        const slugExists = await prisma.category.findUnique({
            where: {
                slug: slug
            }
        })
        if (slugExists) {
            throw new AlreadyExistsError(SLUG_MESSAGES.CREATE.EXISTS)
        }
        if(data.parentSlug) {
            const parentCategory = await prisma.category.findUnique({
                where: {
                    slug: data.parentSlug
                }
            })

            if(!parentCategory) {
                throw new NotFoundError(CATEGORY_MESSAGES.PARENT_CATEGORY_NOT_EXISTS)
            }

            const childCategory = await prisma.category.create({
                data: {
                    name: data.name.toLowerCase(),
                    slug: slug,
                    parent: {
                        connect: {
                            slug: data.parentSlug
                        }
                    }
                }
            })

            return childCategory
        }

        const category = await prisma.category.create({
            data: {
                name: data.name.toLowerCase(),
                slug: slug
            }
        })

        return category
    }

    async getCategories() {
        const categories = await prisma.category.findMany({
            where: {parentId: null},
            include: {
                children: {
                    include: {
                        children: true
                    }
                }
            }
        })

        return categories
    }
}