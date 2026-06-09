import { ProductCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export class ProductRepository {
    async createProduct(data: ProductCreateInput) {
        return await prisma.product.create({
            data: data 
        })
    }

    async getProducts(page=1, limit=10) {
        const skip = (page - 1) * limit
        return await prisma.product.findMany({
            skip: skip,
            take: limit
        })
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