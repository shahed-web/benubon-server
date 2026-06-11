import { Router } from "express";
import { MediaController } from "./media.controller";

const router = Router()

const controller = new MediaController()

router.post("/upload-image", controller.uploadImage.bind(controller))
router.post("/complete-upload", controller.completeUpload.bind(controller))

export default router;