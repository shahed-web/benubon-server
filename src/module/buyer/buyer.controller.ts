import { NextFunction, Request, Response } from "express";
import { buyerSchema } from "./buyer.validation";
import { BuyerService } from "./buyer.service";
import { BUYER_MESSAGE } from "../../constant/messages";

const buyerService = new BuyerService()
export class BuyerController {
    async createBuyer (req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = buyerSchema.parse(req.body)
            const buyer = await buyerService.createBuyer(parsed)
            res.status(201).json({
                success: true,
                message: BUYER_MESSAGE.CREATE.SUCCESS
            })
        }catch(error) {
            next(error)
        }
    } 

    async getBuyers (req: Request, res: Response, next: NextFunction) {
        try {
            const buyers = await buyerService.getBuyers()
            res.status(200).json({
                success: true,
                message: BUYER_MESSAGE.FETCH.SUCCESS,
                data: buyers
            })
        } catch(error) {
            next(error)
        }
    }
}