import _ from "lodash";
import type { NextFunction, Request, Response } from "express";
import { createCategorySchema } from "./category.validation";
import { CategoryService } from "./category.service";
import type { CreateCategoryRequest, CreateCategoryResponse, FetchCategoryResponse } from "./category.types";
import { CATEGORY_MESSAGES } from "../../constant/messages";

const categoryService = new CategoryService()

export class CategoryController {
    async create(req: Request<{}, {}, CreateCategoryRequest>, res: Response<CreateCategoryResponse>, next: NextFunction) {
        try {
            const parsed = createCategorySchema.parse(req.body)
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
}