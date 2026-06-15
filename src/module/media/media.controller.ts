import { NextFunction, Request, Response } from "express";
import { MediaService } from "./media.service";
import { UploadIntentRequest } from "./media.type";

const mediaService = new MediaService()
export class MediaController {
    async uploadIntent (req: Request<{}, {}, UploadIntentRequest>, res: Response, next: NextFunction) {
        try {
            const result = await mediaService.generateUploadUrls(req.body.id, req.body.entity, req.body.files);
            res.json({
                success: true,
                data: result
            })
        } catch (error) {
            next(error);
        }
    }
}