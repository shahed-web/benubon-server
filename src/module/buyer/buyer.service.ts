import { BUYER_MESSAGE } from "../../constant/messages";
import { AlreadyExistsError } from "../../utils/errors/app-error";
import { BuyerRepository } from "./buyer.repository";
import { BuyerInput, UpdateBuyerInput } from "./buyer.validation";

const nullable = <T>(value: T | undefined): T | null => {
  return value ?? null;
};

const repository = new BuyerRepository();

export class BuyerService {
    async createBuyer(data: BuyerInput) {
        const buyerExist = await repository.buyerExists(data.email);
        if(buyerExist) {
            throw new AlreadyExistsError(BUYER_MESSAGE.CREATE.EXISTS)
        }
        const buyerData = {
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
        }
        const buyer = await repository.createBuyer(buyerData);

        return buyer
    }

    async getBuyers() {
        const buyers = await repository.getBuyers();
        return buyers;
    }

    async getBuyerById(id: string) {
        const buyer = await repository.getBuyerById(id);
        return buyer;
    }   

    async updateBuyer(id: string, data: UpdateBuyerInput) {
        const buyerData = {
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
        }
        const buyer = await repository.updateBuyer(id, buyerData);
        return buyer;
    }

    async softDelete(id: string) {
        const buyer = repository.softDeleteBuyer(id);
        return buyer;
    }

    async restoreDeletedBuyer(id: string) {
        const buyer = repository.restoreDeletedBuyer(id);

        return buyer;
    }
    async permanentDelete(id: string) {
        await repository.permanentDelete(id);
    }
}