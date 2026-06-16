import _ from "lodash";
import type { NextFunction, Request, Response } from "express";
import { categorySchema, completeUploadSchema, replaceCategorySchema } from "./category.validation";
import { CategoryService } from "./category.service";
import type { CategoryParams, CategoryInputRequest, CategoryResponse, FetchCategoryResponse } from "./category.types";
import { CATEGORY_MESSAGES, MEDIA_MESSAGE } from "../../constant/messages";


const categoryService = new CategoryService()

export class CategoryController {
    async create(req: Request<{}, {}, CategoryInputRequest>, res: Response<CategoryResponse>, next: NextFunction) {
        try {
            const parsed = categorySchema.parse(req.body)
            const category = await categoryService.createCategory(parsed)

            res.status(201).json({
                success: true,
                message: CATEGORY_MESSAGES.CREATE.SUCCESS,
                data: _.pick(category, ["id", "name", "slug"])
            })
        } catch(error) {
            next(error)
        }
    }

    async getAll(req: Request, res: Response<FetchCategoryResponse>, next: NextFunction) {
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10

            const { categories, meta } = await categoryService.getCategories(page, limit)

            res.status(200).json({
                success: true,
                message: CATEGORY_MESSAGES.FETCH.SUCCESS,
                data: { categories, meta }
            })
        } catch (error) {
            next(error)
        }
}

    async update(req:Request<CategoryParams, {}, CategoryInputRequest>, res:Response<CategoryResponse>, next: NextFunction) {
        try {
            const id = Number(req.params.categoryId)
            const parsed = categorySchema.parse(req.body)
            const updatedCategory = await categoryService.updateCategory(parsed, id)

            res.status(200).json({
                success: true,
                message: CATEGORY_MESSAGES.UPDATE.SUCCESS,
                data: _.pick(updatedCategory, ["id", "name", "slug"])
            })
        } catch(error) {
            next(error)
        }
    }

    async delete(req:Request<CategoryParams>, res:Response, next: NextFunction) {
       try {
            const id = Number(req.params.categoryId)
            await categoryService.deleteCategory(id)
            res.status(200).json({
                success: true,
                message: CATEGORY_MESSAGES.DELETE.SUCCESS
            })
       } catch(error) {
            next(error)
       }
    }

    async softDelete(req:Request<CategoryParams>, res:Response, next: NextFunction) {
       try {
            const id = Number(req.params.categoryId)
            await categoryService.softDeleteCategory(id)
            res.status(200).json({
                success: true,
                message: CATEGORY_MESSAGES.DELETE.SUCCESS
            })
       } catch(error) {
            next(error)
       }
    }

    async retrieve(req:Request<CategoryParams>, res:Response, next: NextFunction) {
       try {
            const id = Number(req.params.categoryId)
            await categoryService.retrieveCategory(id)
            res.status(200).json({
                success: true,
                message: CATEGORY_MESSAGES.RETRIEVE.SUCCESS
            })
       } catch(error) {
            next(error)
       }
    }

    async view(req:Request<CategoryParams>, res:Response, next: NextFunction) {
       try {
            const id = Number(req.params.categoryId)
            const category = await categoryService.viewCategory(id)
            res.status(200).json({
                success: true,
                message: CATEGORY_MESSAGES.FETCH.SUCCESS,
                data: category
            })
       } catch(error) {
            next(error)
       }
    }

    async categoryOptions(req: Request, res: Response, next: NextFunction) {
        try {
            const options = await categoryService.categoryOptions()
            res.json({
                success: true,
                message: CATEGORY_MESSAGES.FETCH.SUCCESS,
                data: options
            })
        }catch(error) {
            next(error)
        }
    }

    async categoryImageUploadComplete(req: Request, res: Response, next: NextFunction) {
        try{
            const parsed = completeUploadSchema.parse(req.body);
            const result = await categoryService.completeUpload(parsed);
            res.json({
                success: true,
                message: MEDIA_MESSAGE.UPLOAD.SUCCESS,
                data: result
            })
        }catch(error) {
            next(error);
        }
    }

    async replaceCategoryImage(req: Request<CategoryParams, {}, {}>, res: Response, next: NextFunction) {
        try {
            const categoryId = Number(req.params.categoryId)
            // console.log(categoryId)
            // console.log(typeof categoryId)
            // console.log("hello from body ",req.body)
     
            const parsed = completeUploadSchema.parse(req.body)
            const files = parsed.files[0]

            if (!files) {
                throw new Error("No file provided")
            }

            await categoryService.replaceCategoryImage(categoryId, files)

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