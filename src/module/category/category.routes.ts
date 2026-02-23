import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();
const controller = new CategoryController();

router.post("/create", controller.create.bind(controller))
router.get("/all-categories", controller.getAll.bind(controller))

export default router;