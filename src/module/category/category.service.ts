import { CATEGORY_MESSAGES, SLUG_MESSAGES } from "../../constant/messages";
import { AlreadyExistsError, NotFoundError } from "../../utils/errors/app-error";
import { MediaService } from "../media/media.service";
import { CompleteUploadFile, CompleteUploadRequest } from "../media/media.type";
import { CategoryRepository } from "./category.repository";
import { type CategoryInput } from "./category.validation";

const repository = new CategoryRepository();
const mediaService = new MediaService()

export class CategoryService {
    async createCategory(data: CategoryInput) {
        const slug = data.name.toLowerCase().replace(/\s+/g, '-');
        const slugExists = await repository.categorySlug(slug);
        if (slugExists) {
            throw new AlreadyExistsError(SLUG_MESSAGES.CREATE.EXISTS)
        }
        if(data.parentId) {
            const parentCategory = await repository.viewCategory(data.parentId)

            if(!parentCategory) {
                throw new NotFoundError(CATEGORY_MESSAGES.CATEGORY_NOT_EXISTS)
            }
            const categoryData = {
                    name: data.name.toLowerCase(),
                    slug: slug,
                    description: data.description ? data.description : null,
                    parent: {
                        connect: {
                            id: data.parentId
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
        let slug
        const dataFromDB = await repository.viewCategory(id)
        if (!dataFromDB) {
            throw new NotFoundError(CATEGORY_MESSAGES.CATEGORY_NOT_EXISTS)
        }
        if(data.name.toLowerCase() != dataFromDB?.name) {
            slug = data.name.toLowerCase().replace(/\s+/g, '-');

            const slugExists = await repository.categorySlug(slug);
            
            if (slugExists) {
                throw new AlreadyExistsError(SLUG_MESSAGES.CREATE.EXISTS)
            }
        } else {
            slug = dataFromDB.slug
        }

        if(data.parentId) {
            const parentCategory = await repository.viewCategory(data.parentId)

            if(!parentCategory) {
                throw new NotFoundError(CATEGORY_MESSAGES.CATEGORY_NOT_EXISTS)
            }

            const updateChildCategoryData = {
                    name: data.name.toLowerCase(),
                    slug: slug,
                    description: data.description ? data.description : dataFromDB.description,
                    status: data.status ? data.status : dataFromDB.status,
                    parent: {
                        connect: {
                            id: data.parentId
                        }
                    }
                }

            const updatedChildCategory = await repository.updateCategory(id, updateChildCategoryData)

            return updatedChildCategory
        }

        const updateCategoryData = {
            name: data.name.toLowerCase(),
            slug: slug,
            description: data.description ? data.description : dataFromDB.description,
            status: data.status ? data.status : dataFromDB.status,
            parentId: null
        }
        const updatedCategory = await repository.updateCategory(id, updateCategoryData)
        return updatedCategory
    }

    async deleteCategory(id:number) {
        const getCategoryWithImage = await repository.viewCategory(id)
        const images = getCategoryWithImage?.categoryImages
        if(images?.length) {
            const categoryImage = await repository.getCategoryImage(id)
            const mediaId = categoryImage?.mediaId
            const objectKeys = images.map( image => image.media.objectKey);
            await mediaService.deleteFiles(objectKeys)
            await repository.deleteCategory(id)
            await mediaService.deleteSingleMedia(mediaId!)
            return
        }

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

    async completeUpload(payload: CompleteUploadRequest) {
        return await repository.completeUpload(payload)
    }

    async categoryOptions() {
        return await repository.categoryOptions()
    }
    
    async replaceCategoryImage(categoryId:number, replaceData: CompleteUploadFile) {
        const oldImage = await repository.getCategoryImage(categoryId)
        const oldMediaId = oldImage?.media.id
        const oldObjectKey = oldImage?.media.objectKey
        const oldCategoryImageId = oldImage?.id
        
        if(!oldMediaId || !oldObjectKey || !oldCategoryImageId) {
            throw new NotFoundError("media not found")
        }
        
        await repository.deleteCategoryImage(oldCategoryImageId)

        await mediaService.deleteSingleMedia(oldMediaId)
        
        const newMedia = await mediaService.createMedia(replaceData)
        
        await repository.createCategoryImageMedia(categoryId, newMedia.id)
        
        await mediaService.deleteFile(oldObjectKey)

    }
}