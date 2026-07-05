import _ from "lodash";
import type { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { ROLE_MESSAGES, USER_MESSAGES } from "../../constant/messages";
import { userSchema } from "./user.validations";
import { email } from "zod";

const userService = new UserService()

export class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = userSchema.parse(req.body)
            const user = await userService.createUser(parsed)
            res.send(201).json({
                success: true,
                message: USER_MESSAGES.CREATE.SUCCESS,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    active: user.isActive
                }
            })
        }catch(error) {
            next(error)
        }
    }

    async userDetails(req: Request<{userId: string}, {}, {}>, res: Response, next: NextFunction) {
        try{
            const id = req.params.userId
            const user = await userService.userDetails(id)
            res.json({
                success: true,
                message: USER_MESSAGES.FETCH.SUCCESS,
                data: user
            })
        } catch(error) {
            next(error)
        }
    }

    async getUser(req:Request, res:Response, next: NextFunction) {
        try{
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const {users, meta} = await userService.getUser(page, limit)
            res.status(200).json({
                success: true,
                message: USER_MESSAGES.FETCH.SUCCESS,
                data: {users, meta}
            })
        } catch(error) {
            next(error)
        }
    }

    async assignRole (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId as string
            const roleId = req.body.roleId as string
            const result = await userService.assignRole(userId, roleId)
            res.send(200).json({
                success: true,
                message: ROLE_MESSAGES.ASSIGN.SUCCESS
            })
        } catch(error) {
            next(error)
        }
    }
}