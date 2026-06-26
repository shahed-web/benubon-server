import type { NextFunction, Request, Response } from "express";
import type { AuthInputRequest, AuthResponse } from "./auth.types";
import { authSchema } from "./auth.validations";
import { AuthService } from "./auth.service";
import { AUTH_MESSAGES } from "../../constant/messages";
import { UnauthorizedError } from "../../utils/errors/app-error";
import { AuthenticateRequest } from "../../middleware/auth.middleware";

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

            // res.cookie("accessToken", loginData.accessToken, {
            //     httpOnly: true,
            //     sameSite: "lax",
            //     secure: true
            // })
            
            res.cookie("refreshToken", loginData.refreshToken, {
                httpOnly: true,
                sameSite: "lax",
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

    async refreshTokenHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies?.refreshToken
            if(!refreshToken) {
                throw new UnauthorizedError(AUTH_MESSAGES.AUTHORIZE.FAILED)
            }
            const {success, accessToken} = await authService.refreshTokenHandler(refreshToken)
            
            if(!success) {
                res.clearCookie("accessToken")
                res.clearCookie("refreshToken")
                return res.status(401).json({
                    success: false,
                    message: AUTH_MESSAGES.AUTHORIZE.FAILED
                })
            }

            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: true
            })

            res.status(200).json({
                success: true,
                message: AUTH_MESSAGES.LOGIN.SUCCESS,
                data: {
                    refreshToken: refreshToken,
                    accessToken: accessToken
                }
            })
        }catch(error) {
            next(error)
        }
    }

    async authUserData (req:AuthenticateRequest, res:Response, next: NextFunction) {
    
        try {
            const user = req.user
            const refreshToken = req.cookies.refreshToken
            if (!user) {
                console.log("nope")
                throw new UnauthorizedError(AUTH_MESSAGES.AUTHORIZE.FAILED)
            }
            const data = await authService.authUserData(user.id, refreshToken)
            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: true
            })
            res.status(200).json({
                data: {
                    user: data.user,
                    accessToken: data.accessToken
                }
            })
        } catch(error) {
            console.log(error)
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if(refreshToken) {
                await authService.revokeSession(refreshToken)
            }

            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "lax",
                secure: false, // true in production HTTPS
            });

            res.status(200).json({
                success: true,
                message: AUTH_MESSAGES.LOGOUT.SUCCESS
            })
        } catch (error) {
            next(error)
        }
    }
}