import type { NextFunction, Request, Response } from "express";
import { roleSchema } from "./role.validations";
import { RoleService } from "./role.service";
import { PERMISSION_MESSAGES, ROLE_MESSAGES } from "../../constant/messages";
import { success } from "zod";

const roleService = new RoleService()

export class RoleController {
    async createRole(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = roleSchema.parse(req.body)
            const role = await roleService.createRole(parsed)
            res.status(201).json({
                success: true,
                message: ROLE_MESSAGES.CREATE.SUCCESS,
                data: {
                    id: role.id,
                    name: role.name
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async assignPermission (req: Request, res: Response, next: NextFunction) {
        try {
            const roleId= req.params.roleId as string;
            const permissionIds = req.body as string[];
            await roleService.assignPermission(roleId, permissionIds)
            res.status(200).json({
                success: true,
                message: PERMISSION_MESSAGES.ASSIGN.SUCCESS
            })
        }catch(error) {
            next(error)
        }
    }
}