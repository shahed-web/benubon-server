import { CATEGORY_MESSAGES, SLUG_MESSAGES } from "../../constant/messages";
import { AlreadyExistsError, NotFoundError } from "../../utils/errors/app-error";
import { CategoryRepository } from "./category.repository";
import type { CategoryInput } from "./category.validation";

const repository = new CategoryRepository();
export class CategoryService {
    async createCategory(data: CategoryInput) {
        const slug = data.name.toLowerCase().replace(/\s+/g, '-');
        const slugExists = await repository.categorySlug(slug);
        if (slugExists) {
            throw new AlreadyExistsError(SLUG_MESSAGES.CREATE.EXISTS)
        }
        if(data.parentSlug) {
            const parentCategory = await repository.categorySlug(data.parentSlug)

            if(!parentCategory) {
                throw new NotFoundError(CATEGORY_MESSAGES.PARENT_CATEGORY_NOT_EXISTS)
            }
            const categoryData = {
                    name: data.name.toLowerCase(),
                    slug: slug,
                    description: data.description ? data.description : null,
                    parent: {
                        connect: {
                            slug: data.parentSlug
                        }
                    }
                }
            const childCategory = await repository.createCategory(categoryData)

            return childCategory
        }
        const categoryData = {
            name: data.name.toLowerCase(),
            slug: slug,
            description: data.description ? data.description : null
        }
        const category = await repository.createCategory(categoryData)

        return category
    }

    async getCategories(page=1, limit=10) {
        const skip = (page - 1) * limit
        const orderBy = {
            createdAt: 'desc' as const
        }
        const { categories, total } = await repository.getCategories(skip, limit, orderBy)
        return { 
            categories,
            meta: {
                total,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                limit: limit,
                hasNextPage: page * limit < total,
                hasPreviousPage: page > 1
            }
         }
    }

    async updateCategory(data: CategoryInput, id: number) {
        const slug = data.name.toLowerCase().replace(/\s+/g, '-');
        const slugExists = await repository.categorySlug(slug);

        if (slugExists) {
            throw new AlreadyExistsError(SLUG_MESSAGES.CREATE.EXISTS)
        }

        if(data.parentSlug) {
            const parentCategory = await repository.categorySlug(data.parentSlug)

            if(!parentCategory) {
                throw new NotFoundError(CATEGORY_MESSAGES.PARENT_CATEGORY_NOT_EXISTS)
            }

            const updateChildCategoryData = {
                    name: data.name.toLowerCase(),
                    slug: slug,
                    parent: {
                        connect: {
                            slug: data.parentSlug
                        }
                    }
                }

            const updatedChildCategory = await repository.updateCategory(id, updateChildCategoryData)

            return updatedChildCategory
        }

        const updateCategoryData = {
            name: data.name.toLowerCase(),
            slug: slug,
            parentId: null
        }
        const updatedCategory = await repository.updateCategory(id, updateCategoryData)
        return updatedCategory
    }

    async deleteCategory(id:number) {
        await repository.deleteCategory(id)
    }

    async softDeleteCategory(id:number) {
        await repository.softDeleteCategory(id)
    }

    async retrieveCategory(id:number) {
        return await repository.retriveCategory(id)
    }

    async viewCategory(id:number) {
        return await repository.viewCategory(id)
    }

    async categoryOptions() {
        return await repository.categoryOptions()
    }
}