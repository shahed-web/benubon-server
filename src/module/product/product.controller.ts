import type { NextFunction, Request, Response } from "express"
import type { ProductInputRequest, ProductParams, ProductResponse } from "./product.types"
import { productSchema } from "./product.validation"
import { ProductService } from "./product.service"
import { PRODUCT_MESSAGES } from "../../constant/messages"

const productService = new ProductService()
export class ProductController {
    async create(req: Request<{}, {}, ProductInputRequest>, res: Response, next: NextFunction) {
        try {
            const parsed = productSchema.parse(req.body)
            
            const product = await productService.createProduct(parsed)      
            
            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product
            })
        } catch (error) {
            next(error)
        }
    }       

    async getall(req: Request, res: Response, next: NextFunction) {
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const data = await productService.getProducts(page, limit)
            res.status(200).json({
                success: true,
                message: PRODUCT_MESSAGES.FETCH.SUCCESS,
                data: data
            })
        } catch(error) {
            next(error)
        }
    }

    async view(req: Request<ProductParams>, res: Response, next: NextFunction) {
        try {
            const  id  = Number(req.params.productId)
            const product = await productService.getProductById(id) 
            res.status(200).json({
                success: true,
                message: PRODUCT_MESSAGES.FETCH.SUCCESS,
                data: product
            })        
        }catch (error) {
            next(error)
        }
    }

    async softDelete(req: Request<ProductParams>, res: Response, next: NextFunction) {
        try {
            const  id  = Number(req.params.productId)
            await productService.softDeleteProduct(id)
            res.status(200).json({
                success: true,
                message: PRODUCT_MESSAGES.DELETE.SUCCESS
            })        
        }catch (error) {
            next(error)
        }
    }

    async retrieveProduct(req: Request<ProductParams>, res: Response, next: NextFunction) {
        try {
            const  id  = Number(req.params.productId)
            const product = await productService.retrieveProduct(id) 
            res.status(200).json({
                success: true,
                message: PRODUCT_MESSAGES.FETCH.SUCCESS,
                data: product
            })        
        }catch (error) {
            next(error)
        }
    }
}