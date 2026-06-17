import { ArtisanCreateInput, ArtisanUpdateInput } from "../../generated/prisma/models";
import { removeUndefinedFields } from "../../utils/removeUndefinedFields";
import { ArtisanRepository } from "./artisan.repository";
import { CreateArtisanInput, UpdateArtisanInput } from "./artisan.validation";

const repository = new ArtisanRepository();
export class ArtisanService {
    async getArtisans(page=1, limit=10) {
        const skip = (page - 1) * limit
        const orderBy = {
            createdAt: 'desc' as const
        }
        const {artisan, total} = await repository.getArtisans(skip, limit, orderBy);
        return { 
            artisan,
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
    async getArtisanById(id: number) {
        return await repository.getArtisanById(id);
    }
    async createArtisan(artisanData: CreateArtisanInput) {
        const data = {
            name: artisanData.name,
            materials: artisanData.materials,
            location: artisanData.location? artisanData.location : null,
            monthlyCapacity: artisanData.monthlyCapacity ? artisanData.monthlyCapacity : null,
            reliabilityScore: artisanData.reliabilityScore ? artisanData.reliabilityScore : null,
            notes: artisanData.notes ? artisanData.notes : null
        }
        return await repository.createArtisan(data);
    }
    async updateArtisan(id: number, artisanData: UpdateArtisanInput) {
        const data = removeUndefinedFields({
            name: artisanData.name,
            materials: artisanData.materials,
            location: artisanData.location,
            monthlyCapacity: artisanData.monthlyCapacity,
            reliabilityScore: artisanData.reliabilityScore,
            notes: artisanData.notes,
            isActive: artisanData.isActive
        }) as ArtisanUpdateInput;

        return await repository.updateArtisan(id, data);
    }
    async softDeleteArtisan(id: number) {
        return await repository.softDeleteArtisan(id);
    }
    
    async restoreArtisan(id:number) {
        return await repository.restoreArtisan(id)
    }
    async permanentDeleteArtisan(id: number) {
        return await repository.permanentDeleteArtisan(id);
    }
}