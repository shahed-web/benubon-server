import { NextFunction, Request, Response } from "express";
import { CreateArtisanRequestBody, UpdateArtisanRequestBody } from "./artisan.types";
import { ArtisanService } from "./artisan.service";
import { ARTISAN_MESSAGE } from "../../constant/messages";
import {createArtisanSchema, updateArtisanSchema} from "./artisan.validation"

const artisanService = new ArtisanService();
export class ArtisanController {
    async getArtisan(req: Request, res: Response, next: NextFunction) {
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const {artisan, meta} = await artisanService.getArtisans(page, limit);
            res.status(200).json({
                success: true,
                message: ARTISAN_MESSAGE.FETCH.SUCCESS,
                data: {artisan, meta}
            });
        }catch(error) {
            next(error);
        }
    }
    async getArtisanById(req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const artisan = await artisanService.getArtisanById(id);
            res.status(200).json({
                success: true,
                message: ARTISAN_MESSAGE.FETCH.SUCCESS,
                data: artisan
            });
        }catch (error) {
            next(error);
        }
    }
    async createArtisan(req: Request<{}, {}, CreateArtisanRequestBody>, res: Response, next: NextFunction) {
        try {
            const parsed = createArtisanSchema.parse(req.body)
            const artisan = await artisanService.createArtisan(parsed);
            res.status(201).json({
                success: true,
                message: ARTISAN_MESSAGE.CREATE.SUCCESS,
                data: artisan
            });
        }catch(error) {
            next(error);
        }
    }
    async updateArtisan(req: Request<{id: string}, {}, UpdateArtisanRequestBody>, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const parsed = updateArtisanSchema.parse(req.body)
            const artisan = await artisanService.updateArtisan(id, parsed);
            res.status(200).json({
                success: true,
                message: ARTISAN_MESSAGE.UPDATE.SUCCESS,
                data: artisan
            });
        }catch(error) {
            next(error);
        }
    }
    async softDeleteArtisan(req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        try {
            const artisan = await artisanService.softDeleteArtisan(id);
            res.status(200).json({
                success: true,
                message: ARTISAN_MESSAGE.DELETE.SUCCESS,
                data: artisan
            });
        }catch(error) {
            next(error);
        }
    }

    async restoreArtisan(req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        try {
            const artisan = await artisanService.restoreArtisan(id);
            res.status(200).json({
                success: true,
                message: ARTISAN_MESSAGE.DELETE.SUCCESS,
                data: artisan
            });
        }catch(error) {
            next(error);
        }
    }

    async permanentDeleteArtisan(req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        try {
            await artisanService.permanentDeleteArtisan(id);
            res.status(200).json({
                success: true,
                message: ARTISAN_MESSAGE.DELETE.SUCCESS,
            });
        }catch(error) {
            next(error);
        }
    }
}