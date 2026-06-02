import { ProductRepository } from "./product.repository";
import type { ProductInput } from "./product.validation";

const repository = new ProductRepository()
export class ProductService {
    async createProduct(data: ProductInput) {
        return await repository.createProduct(data)
    }

    async getAllProducts() {
        return repository.getProducts()
    }

    async getProductById(id: number) {
        return repository.getProductById(id)
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