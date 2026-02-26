import { prisma } from "../../lib/prisma";
import type { ProductInput } from "./product.validation";

export class ProductService {
    async createProduct(data: ProductInput) {
        const product = await prisma.product.create({
            data: data 
        })
        return product
    }

    async getAllProducts() {
        const products = await prisma.product.findMany()
        return products
    }

    async getProductById(id: number) {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })
        return product
    }   
}