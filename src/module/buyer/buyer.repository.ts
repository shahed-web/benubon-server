import { BuyerCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { BuyerInput } from "./buyer.validation";

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
}