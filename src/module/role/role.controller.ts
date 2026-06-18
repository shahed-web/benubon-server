import type { NextFunction, Request, Response } from "express";
import { roleSchema } from "./role.validations";
import { RoleService } from "./role.service";
import { PERMISSION_MESSAGES, ROLE_MESSAGES } from "../../constant/messages";

const roleService = new RoleService()

export class RoleController {
    async getRoles (req: Request, res: Response, next: NextFunction) {
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const {roles, meta} = await roleService.getRoles(page, limit)
            res.status(200).json({
                success: true,
                message: ROLE_MESSAGES.FETCH.SUCCESS,
                data: {roles, meta}
            })
        }catch(error) {
            next(error)
        }
    }

    async getRoleById (req: Request, res: Response, next: NextFunction) {
        try {
            const id = String(req.params.id) 
            const role = await roleService.getRoleById(id)
            res.status(200).json({
                success: true,
                message: ROLE_MESSAGES.FETCH.SUCCESS,
                data: role
            })
        }catch(error) {
            next(error)
        }
    }

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

    async updateRole (req: Request, res: Response, next: NextFunction) {
        try{
            const id = String(req.params.id)
            const parsed = roleSchema.parse(req.body)
            const role = await roleService.updateRole(id, parsed)
            res.status(200).json({
                success: true,
                message: ROLE_MESSAGES.UPDATE.SUCCESS,
                data: role
            })  
        }catch(error){
            next(error) 
        }
    }

    async deleteRole (req: Request, res: Response, next: NextFunction) {
        try{
            const id = String(req.params.id)
            await roleService.permanentDelete(id)
            res.status(200).json({
                success: true,
                message: ROLE_MESSAGES.DELETE.SUCCESS,
            })
        }catch(error) {
            next(error)
        }
    }

}