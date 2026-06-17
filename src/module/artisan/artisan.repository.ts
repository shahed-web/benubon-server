import { ArtisanCreateInput, ArtisanUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { OrderBy } from "./artisan.types";

export class ArtisanRepository {
    async getArtisans(skip: number, limit: number, orderBy: OrderBy) {

        const [artisan, total] = await prisma.$transaction([
            prisma.artisan.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: orderBy!,
                    where: {
                        isSoftDelete: false
                    }
            }),
            prisma.artisan.count()
        ])

        return {artisan, total}
    }

    async getArtisanById(id: number) {
        return await prisma.artisan.findFirst({
            where: {
                id,
                isSoftDelete: false,
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
            where: { 
                id: id 
            },
            data: {
                isSoftDelete: true,
            }
        })
    }

    async restoreArtisan (id: number) {
        return await prisma.artisan.update({
            where: { id },
            data: {
                isSoftDelete: false,
            }
        })
    }
    async permanentDeleteArtisan(id: number) {
        return await prisma.artisan.delete({
            where: { id }
        })
    }
}