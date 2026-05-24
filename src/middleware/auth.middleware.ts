import type { NextFunction, Request, Response } from "express";
import { AUTH_MESSAGES } from "../constant/messages";
import { jwtVerify} from "../provider/jwt.provider";
import type { JwtPayloadType } from "../module/auth/auth.types";

export interface AuthenticateRequest extends Request {
    user?: JwtPayloadType
}

export class AuthMiddleware {
    async authenticateToken(req:AuthenticateRequest, res:Response, next: NextFunction) {
        const token = req.cookies.accessToken

        if (!token) {
            return res.status(401).json({
                success: false,
                message: AUTH_MESSAGES.AUTHORIZE.FAILED
            })
        }

        try {
            const user = jwtVerify(token)
            req.user = user
            next()

        } catch(error: any) {
            if(error.name === "TokenExpiredError") {
                 return res.status(401).json({
                    success: false,
                    message: AUTH_MESSAGES.AUTHORIZE.EXPIRED
                })
            }
            res.clearCookie("accessToken")
            res.clearCookie("refreshToken")
            return res.status(401).json({
                success: false,
                message: AUTH_MESSAGES.AUTHORIZE.INVALID_TOKEN
            })
        }
    }

    async authorize(permission: string) {
        return (req: AuthenticateRequest, res: Response, next: NextFunction) => {
            const user = req.user
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: AUTH_MESSAGES.AUTHORIZE.FAILED
                })
            }

            if(user.role === "SUPER_ADMIN") {
                return next()
            }

            const hasPermission = user.permissions.includes(permission)

            if (!hasPermission) {
                return res.status(403).json({
                    success: false,
                    message: AUTH_MESSAGES.AUTHORIZE.FORBIDDEN
                })
            }

            next()
        }
    }
}