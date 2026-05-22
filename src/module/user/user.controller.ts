import _ from "lodash";
import type { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { PERMISSION_MESSAGES, ROLE_MESSAGES } from "../../constant/messages";

const userService = new UserService()

export class UserController {
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