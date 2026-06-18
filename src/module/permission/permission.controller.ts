import _ from "lodash";
import type { NextFunction, Request, Response } from "express";
import { permissionSchema } from "./permission.validations";
import { PermissionService } from "./permission.service";
import { PERMISSION_MESSAGES } from "../../constant/messages";

const permissionService = new PermissionService()

export class PermissionController {
    async createPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = permissionSchema.parse(req.body)
            const permission = await permissionService.createPermission(parsed)

            res.status(201).json({
                success: true,
                message: PERMISSION_MESSAGES.CREATE.SUCCESS,
                data: _.pick(permission, ["id", "name", "description"])
            })
        }catch(error) {
            next(error)
        }
    }

    async updatePermission (req: Request<{id: string}, {}, {}>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const parsed = permissionSchema.parse(req.body)
            const updated = await permissionService.updatePermission(id, parsed)
            res.json({
                success: true,
                message: PERMISSION_MESSAGES.UPDATE.SUCCESS,
                data: updated
            })
        }catch (error) {
            next(error)
        }
    }

    async getPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10

            const {permissions, meta} = await permissionService.getAllPermissions(page, limit)
            res.status(200).json({
                success: true,
                message: PERMISSION_MESSAGES.FETCH.SUCCESS,
                data: {permissions, meta}
            })
        } catch(error) {
            next(error)
        }
    }

    async viewPermission(req:Request<{id: string}, {}, {}>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const permission = await permissionService.getPermissionById(id)
            res.json({
                success: true,
                message: PERMISSION_MESSAGES.FETCH.SUCCESS,
                data: permission
            })
        }catch(error) {
            next(error)
        }
    }

    async deletePermission(req:Request<{id: string}, {}, {}>, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            await permissionService.deletePermission(id)
            res.json({
                success: true,
                message: PERMISSION_MESSAGES.DELETE.SUCCESS
            })
        }catch (error) {
            next(error)
        }
    }
}