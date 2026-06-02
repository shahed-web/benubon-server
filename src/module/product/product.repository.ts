import { ProductCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export class ProductRepository {
    async createProduct(data: ProductCreateInput) {
        return await prisma.product.create({
            data: data 
        })
    }

    async getProducts() {
        return await prisma.product.findMany()
    }

    async getProductById(id: number) {
        return await prisma.product.findUnique({
            where: {
                id: id
            }
        })
    }

    async softDeleteProduct(id: number) {
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                isActive: false,
                deletedAt: new Date()
            }
        })
    }

    async retrieveProduct(id: number) {
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                isActive: true
            }
        })
    }

    async deleteProduct(id: number) {
        await prisma.product.delete({
            where: {
                id: id
            }
        })
    }
}