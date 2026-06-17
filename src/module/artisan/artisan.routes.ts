import {Router} from "express";
import { ArtisanController } from "./artisan.controller";

const router = Router();

const controller = new ArtisanController()

router.get("/get-artisans", controller.getArtisan.bind(controller));
router.post("/create-artisan", controller.createArtisan.bind(controller));
router.get("/view/:id", controller.getArtisanById.bind(controller));
router.put("/update/:id", controller.updateArtisan.bind(controller));
router.patch("/restore-artisan/:id", controller.restoreArtisan.bind(controller));
router.delete("/soft-delete/:id", controller.softDeleteArtisan.bind(controller));
router.delete("/permanent-delete/:id", controller.permanentDeleteArtisan.bind(controller));

export default router;