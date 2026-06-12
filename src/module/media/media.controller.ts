import { NextFunction, Request, Response } from "express";
import { MediaService } from "./media.service";
import { UploadIntentRequest } from "./media.type";
import { completeUploadSchema } from "./media.validation";
import { MEDIA_MESSAGE } from "../../constant/messages";

const mediaService = new MediaService()
export class MediaController {
    async uploadImage (req: Request<{}, {}, UploadIntentRequest>, res: Response, next: NextFunction) {
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

    async completeUpload(req: Request, res: Response, next: NextFunction) {
        try{
            const parsed = completeUploadSchema.parse(req.body);
            const result = await mediaService.completeUpload(parsed);
            res.json({
                success: true,
                message: MEDIA_MESSAGE.UPLOAD.SUCCESS,
                data: result
            })
        }catch(error) {
            next(error);
        }
    }
}