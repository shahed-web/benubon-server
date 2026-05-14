import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router()
const controller = new ProductController();

router.post("/create", controller.create.bind(controller))
router.get("/all-products", controller.getall.bind(controller))


export default router;