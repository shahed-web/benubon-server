import type { NextFunction, Request, Response } from "express"
import type { ProductInputRequest, ProductParams, ProductResponse } from "./product.types"
import { productSchema } from "./product.validation"
import { ProductService } from "./product.service"
import { MEDIA_MESSAGE, PRODUCT_MESSAGES } from "../../constant/messages"
import { completeUploadSchema } from "../media/media.validation"

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

    async deleteProduct(req: Request<ProductParams>, res: Response, next: NextFunction) {
        try{
            const  id  = Number(req.params.productId)
            await productService.deleteProduct(id)
            res.status(200).json({
                success: true,
                message: PRODUCT_MESSAGES.DELETE.SUCCESS
            })
        }catch(error) {
            next(error)
        }

    }

    async productImageUploadComplete(req: Request, res: Response, next: NextFunction) {
        try{
            const parsed = completeUploadSchema.parse(req.body);
            const result = await productService.completeUpload(parsed);
            res.json({
                success: true,
                message: MEDIA_MESSAGE.UPLOAD.SUCCESS,
                data: result
            })
        }catch(error) {
            next(error);
        }
    }

    async replaceProductImage(req: Request<ProductParams, {}, {}>, res: Response, next: NextFunction) {
        try {
            const productId = Number(req.params.productId)
        
            const parsed = completeUploadSchema.parse(req.body)
            const files = parsed.files[0]

            if (!files) {
                throw new Error("No file provided")
            }

            // await productService.replaceProductImage(productId, files)

            res.json({
                success: true,
                message: MEDIA_MESSAGE.REPLACE.SUCCESS
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}
