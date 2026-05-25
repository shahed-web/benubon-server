import { NextFunction, Request, Response } from "express";
import { buyerSchema, updateBuyerSchema } from "./buyer.validation";
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

    async getBuyerById (req: Request, res: Response, next: NextFunction) {
        try {
            const  id  = String(req.params.id)
            const buyer = await buyerService.getBuyerById(id)
            res.status(200).json({
                success: true,
                message: BUYER_MESSAGE.FETCH.SUCCESS,
                data: buyer
            })
        } catch(error) {
            next(error)
        }
    }
    
    async updateBuyer (req: Request, res: Response, next: NextFunction) {
        try{
            const  id  = String(req.params.id)
            const parsed = updateBuyerSchema.parse(req.body)
            const buyer = await buyerService.updateBuyer(id, parsed)
            res.status(200).json({
                success: true,
                message: BUYER_MESSAGE.UPDATE.SUCCESS,
                data: buyer
            })
        }catch(error) {
            next(error)
        }
    }

    async deleteBuyer (req: Request, res: Response, next: NextFunction) {
        try{
            const id = String(req.params.id)
            await buyerService.deleteBuyer(id)
            res.status(200).json({
                success: true,
                message: BUYER_MESSAGE.DELETE.SUCCESS
            })
        }catch(error) {
            next(error)
        }
    }

    async retriveDeletedBuyer (req: Request, res: Response, next: NextFunction) {
        try{
            const id = String(req.params.id)
            const buyer = await buyerService.retriveDeletedBuyer(id)
            res.status(200).json({
                success: true,
                message: BUYER_MESSAGE.FETCH.SUCCESS,
                data: buyer
            })
        }catch(error) {
            next(error)
        }
    }
    
    async permanentDelete (req: Request, res: Response, next: NextFunction) {
        try{
            const id = String(req.params.id)
            await buyerService.permanentDelete(id)
            res.status(200).json({
                success: true,
                message: BUYER_MESSAGE.DELETE.SUCCESS
            })
        }catch(error) {
            next(error)
        }
    }
}