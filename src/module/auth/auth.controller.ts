import type { NextFunction, Request, Response } from "express";
import type { AuthInputRequest, AuthResponse } from "./auth.types";
import { authSchema } from "./auth.validations";
import { AuthService } from "./auth.service";
import { AUTH_MESSAGES } from "../../constant/messages";


const authService = new AuthService()

export class AuthController {
    async register (req: Request<{}, {}, AuthInputRequest>, res: Response<AuthResponse>, next: NextFunction) {
        try {
            const parsed = authSchema.parse(req.body)
            const registeredUser = await authService.register(parsed)
            res.status(200).json({
                success: true,
                message: AUTH_MESSAGES.REGISTER.SUCCESS
            })
        }catch(error) {
            next(error)
        }
    }

    async login (req:Request<{}, {}, AuthInputRequest>, res:Response<AuthResponse>, next:NextFunction) {
        try {
            const parsed = authSchema.parse(req.body)
            const loginData = await authService.login(parsed)

            res.cookie("accessToken", loginData.accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true
            })
            
            res.cookie("refreshToken", loginData.refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true
            })
            
            res.status(200).json({
                success: true,
                message: AUTH_MESSAGES.LOGIN.SUCCESS,
                data: {
                    refreshToken: loginData.refreshToken,
                    accessToken: loginData.accessToken
                }
            })
            
        }catch(error) {
            next(error)
        }
    }
}