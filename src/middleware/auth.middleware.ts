import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { AUTH_MESSAGES } from "../constant/messages";
import { jwtVerify } from "../provider/jwt.provider";
import { success } from "zod";

export interface AuthenticateRequest extends Request {
    user?: string | JwtPayload
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
                res.status(401).json({
                    success: false,
                    message: AUTH_MESSAGES.AUTHORIZE.EXPIRED
                })
            }
            res.status(401).json({
                success: false,
                message: AUTH_MESSAGES.AUTHORIZE.INVALID_TOKEN
            })
        }
    }
}