import type { NextFunction, Request, Response } from "express";
import { createCategorySchema } from "./category.validation";
import { CategoryService } from "./category.service";

const categoryService = new CategoryService()

export class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = createCategorySchema.parse(req.body)

            const category = await categoryService.createCategory(parsed)

            res.status(201).json({
                success: true,
                category: category
            })
        } catch(error) {
            next(error)
        }
    }

    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
            res.send("hello from get categories")
        } catch (error) {
            next(error)
        }
    }
}