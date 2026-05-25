import { ArtisanCreateInput, ArtisanUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export class ArtisanRepository {
    async getArtisans() {
        return await prisma.artisan.findMany({
            where: {
                deletedAt: null,        
            }
        });
    }

    async getArtisanById(id: number) {
        return await prisma.artisan.findFirst({
            where: {
                id,
                deletedAt: null,
            }
        })
    }

    async createArtisan(artisanData: ArtisanCreateInput) {
        return await prisma.artisan.create({
            data: artisanData
        });
    }

    async updateArtisan(id: number, artisanData: ArtisanUpdateInput) {
        return await prisma.artisan.update({
            where: { id },
            data: artisanData
        })
    }

    async softDeleteArtisan(id: number) {
        return await prisma.artisan.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            }
        })
    }

    async permanentDeleteArtisan(id: number) {
        return await prisma.artisan.delete({
            where: { id }
        })
    }
}