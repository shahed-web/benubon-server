import { CompleteUploadFile, CompleteUploadRequest } from "../media/media.type";
import { ProductRepository } from "./product.repository";
import type { ProductInput } from "./product.validation";

const repository = new ProductRepository()
export class ProductService {
    async createProduct(data: ProductInput) {
        return await repository.createProduct(data)
    }

    async getProducts(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit
        const orderBy = {
            createdAt: 'desc' as const
        }
        const {products, total} = await repository.getProducts(skip, limit, orderBy)

        return {
            products,
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

    async getProductById(id: number) {
        return await repository.getProductById(id)
    }
    
    async softDeleteProduct(id: number) {
        await repository.softDeleteProduct(id)
    }

    async retrieveProduct(id: number) {
        await repository.retrieveProduct(id)
    }

    async deleteProduct(id: number) {
        await repository.deleteProduct(id)
    }

    async completeUpload (payload: CompleteUploadRequest) {
        return await repository.completeUpload(payload)
    }

    async replaceProductImage(productId:number, replaceData: CompleteUploadFile) {
        // const oldImage = await repository.getCategoryImage(productId)
        // const oldMediaId = oldImage?.media.id
        // const oldObjectKey = oldImage?.media.objectKey
        // const oldCategoryImageId = oldImage?.id
        
        // if(!oldMediaId || !oldObjectKey || !oldCategoryImageId) {
        //     throw new NotFoundError("media not found")
        // }
        
        // await repository.deleteCategoryImage(oldCategoryImageId)

        // await mediaService.deleteSingleMedia(oldMediaId)
        
        // const newMedia = await mediaService.createMedia(replaceData)
        
        // await repository.createCategoryImageMedia(productId, newMedia.id)
        
        // await mediaService.deleteFile(oldObjectKey)

    }
}