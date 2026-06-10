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
}