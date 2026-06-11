import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router()
const controller = new ProductController();

router.post("/create", controller.create.bind(controller))
router.get("/all-products", controller.getall.bind(controller))
router.get("/:productId", controller.view.bind(controller))
router.patch("/soft-delete/:productId", controller.softDelete.bind(controller))
router.patch("/retrieve/:productId", controller.retrieveProduct.bind(controller))

router.delete("/delete/:productId", controller.deleteProduct.bind(controller))


export default router;