import { BuyerCreateInput, BuyerUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { OrderBy } from "./buyer.types";

export class BuyerRepository {
    async buyerExists(email: string) {
        return await prisma.buyer.findUnique({
            where: {
                email,
            }
        })
    }

    async createBuyer (data: BuyerCreateInput) {
        return await prisma.buyer.create({
            data: data,
        });
    }

    async getBuyers(skip: number, limit: number, orderBy: OrderBy) {

    const [buyers, total] = await prisma.$transaction([
            prisma.buyer.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: orderBy!,
                    where: {
                        isSoftDelete: false
                    }
            }),
            prisma.buyer.count()
        ])
        return {buyers, total}
    }

    async getBuyerById(id: string) {
        return await prisma.buyer.findFirst({
            where: {
                id,
                deletedAt: null,
            },
        });
    }

    async updateBuyer(id: string, data: BuyerUpdateInput) {
        return await prisma.buyer.update({
            where: { id },
            data: data,
        });
    }

    async softDeleteBuyer(id: string) {
        return await prisma.buyer.update({
            where: {
                id,
            },
            data: {
                isSoftDelete: true
            },
        });
    }

    async restoreDeletedBuyer(id: string) {
        await prisma.buyer.update({
            where: {
                id
            },
            data: {
                isSoftDelete: false
            }
        });
    }

    async permanentDelete(id: string) {
        await prisma.buyer.delete({
            where: {
                id,
            }
        })
    }
}