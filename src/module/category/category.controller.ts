import _ from "lodash";
import type { NextFunction, Request, Response } from "express";
import { categorySchema } from "./category.validation";
import { CategoryService } from "./category.service";
import type { CategoryParams, CategoryInputRequest, CategoryResponse, FetchCategoryResponse } from "./category.types";
import { CATEGORY_MESSAGES } from "../../constant/messages";


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
            const categories = await categoryService.getCategories()

            res.status(200).json({
                success: true,
                message: CATEGORY_MESSAGES.FETCH.SUCCESS,
                data: categories
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

    async retrive(req:Request<CategoryParams>, res:Response, next: NextFunction) {
       try {
            const id = Number(req.params.categoryId)
            await categoryService.retriveCategory(id)
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
                data: _.pick(category, ["id", "name", "slug"])
            })
       } catch(error) {
            next(error)
       }
    }
}