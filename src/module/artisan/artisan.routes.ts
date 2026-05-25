import {Router} from "express";
import { ArtisanController } from "./artisan.controller";

const router = Router();

const controller = new ArtisanController()

router.get("/", controller.getArtisan.bind(controller));
router.post("/", controller.createArtisan.bind(controller));
router.get("/:id", controller.getArtisanById.bind(controller));
router.put("/update/:id", controller.updateArtisan.bind(controller));
router.delete("/soft-delete/:id", controller.softDeleteArtisan.bind(controller));
router.delete("/permanent-delete/:id", controller.permanentDeleteArtisan.bind(controller));

export default router;