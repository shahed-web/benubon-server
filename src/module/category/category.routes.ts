import { Router } from "express";
import { CategoryController } from "./category.controller";
import { AuthMiddleware } from "../../middleware/auth.middleware";

const router = Router();
const controller = new CategoryController();
const middleware = new AuthMiddleware()

router.get("/view/:categoryId", controller.view.bind(controller))
router.get("/all-categories", [middleware.authenticateToken], controller.getAll.bind(controller))

router.post("/create", controller.create.bind(controller))
router.put("/update/:categoryId", controller.update.bind(controller))
router.delete("/delete/:categoryId", controller.delete.bind(controller))
router.patch("/archive/:categoryId", controller.softDelete.bind(controller))
router.patch("/retrive/:categoryId", controller.retrive.bind(controller))

export default router;