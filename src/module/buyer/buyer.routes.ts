import {Router} from 'express'
import { BuyerController } from './buyer.controller'

const router = Router()

const buyerController = new BuyerController()

router.post("/create", buyerController.createBuyer.bind(buyerController))
router.get("/get-buyers", buyerController.getBuyers.bind(buyerController))
router.get("/view/:id", buyerController.getBuyerById.bind(buyerController))
router.put("/update/:id", buyerController.updateBuyer.bind(buyerController))
router.patch("/restore-deleted/:id", buyerController.retriveDeletedBuyer.bind(buyerController))
router.delete("/soft-delete/:id", buyerController.softDelete.bind(buyerController))
router.delete("/permanent-delete/:id", buyerController.permanentDelete.bind(buyerController))

export default router