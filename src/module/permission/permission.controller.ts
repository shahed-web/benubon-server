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

    async getPermissions(req: Request, res: Response, next: NextFunction) {
        try {

        } catch(error) {
            next(error)
        }
    }
}