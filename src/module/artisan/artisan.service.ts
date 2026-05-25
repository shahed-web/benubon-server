import { ArtisanCreateInput, ArtisanUpdateInput } from "../../generated/prisma/models";
import { removeUndefinedFields } from "../../utils/removeUndefinedFields";
import { ArtisanRepository } from "./artisan.repository";

const repository = new ArtisanRepository();
export class ArtisanService {
    async getArtisans() {
        return await repository.getArtisans();
    }
    async getArtisanById(id: number) {
        return await repository.getArtisanById(id);
    }
    async createArtisan(artisanData: ArtisanCreateInput) {
        return await repository.createArtisan(artisanData);
    }
    async updateArtisan(id: number, artisanData: ArtisanUpdateInput) {
        const filteredData = removeUndefinedFields(artisanData);
        return await repository.updateArtisan(id, filteredData);
    }
    async softDeleteArtisan(id: number) {
        return await repository.softDeleteArtisan(id);
    }
    async permanentDeleteArtisan(id: number) {
        return await repository.permanentDeleteArtisan(id);
    }
}