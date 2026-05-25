import { BUYER_MESSAGE } from "../../constant/messages";
import { prisma } from "../../lib/prisma";
import { AlreadyExistsError } from "../../utils/errors/app-error";
import { BuyerInput, UpdateBuyerInput } from "./buyer.validation";

const nullable = <T>(value: T | undefined): T | null => {
  return value ?? null;
};

export class BuyerService {
    async createBuyer(data: BuyerInput) {
        const buyerExist = await prisma.buyer.findUnique({
            where: {
                email: data.email
            }
        })
        if(buyerExist) {
            throw new AlreadyExistsError(BUYER_MESSAGE.CREATE.EXISTS)
        }
        const buyer = await prisma.buyer.create({
            data: {
                name: nullable(data.name),
                email: data.email,
                country: nullable(data.country),
                companyName: nullable(data.companyName),
                phone: nullable(data.phone),

                status: data.status,
                type: data.type,

                lastContactAt: data.lastContact
                ? new Date(data.lastContact)
                : null,

                notes: nullable(data.notes),
            },
        });

        return buyer
    }

    async getBuyers() {
        const buyers = await prisma.buyer.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            createdAt: "desc",
        },
        });

        return buyers;
    }

    async getBuyerById(id: string) {
        const buyer = await prisma.buyer.findFirst({
        where: {
            id,
            deletedAt: null,
        },
        });

        return buyer;
    }   

    async updateBuyer(id: string, data: UpdateBuyerInput) {
         const buyer = await prisma.buyer.update({
        where: { id },

        data: {
        ...(data.name !== undefined && {
            name: data.name,
        }),

        ...(data.email !== undefined && {
            email: data.email,
        }),

        ...(data.country !== undefined && {
            country: data.country,
        }),

        ...(data.companyName !== undefined && {
            companyName: data.companyName,
        }),

        ...(data.phone !== undefined && {
            phone: data.phone,
        }),

        ...(data.status !== undefined && {
            status: data.status,
        }),

        ...(data.type !== undefined && {
            type: data.type,
        }),

        ...(data.notes !== undefined && {
            notes: data.notes,
        }),

        ...(data.lastContact !== undefined && {
            lastContactAt: data.lastContact
            ? new Date(data.lastContact)
            : null,
        }),
        },
    });

    return buyer;
    }

    async deleteBuyer(id: string) {
        const buyer = await prisma.buyer.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });

        return buyer;
    }

    async retriveDeletedBuyer(id: string) {
        const buyer = await prisma.buyer.findFirst({
            where: {
                id,
                deletedAt: {
                    not: null
                }
            }
        });

        return buyer;
    }
    async permanentDelete(id: string) {
        await prisma.buyer.delete({
            where: {
                id,
            }
        })
    }
}