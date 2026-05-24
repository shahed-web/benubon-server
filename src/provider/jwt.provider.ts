import jwt, { type SignOptions } from "jsonwebtoken";
import { envConfig } from "../config/env.config";
import type { JwtPayloadType } from "../module/auth/auth.types";

export function generateJWT (data: JwtPayloadType, expiresIn: string) {
    const jwtSecret = envConfig.JWT.SECRET
    return jwt.sign(data, jwtSecret, {expiresIn} as SignOptions)
}

export function generateAccessToken (data: JwtPayloadType) {
    const jwtSecret = envConfig.JWT.SECRET
    const expiresIn = envConfig.JWT.ACCESS_TOKEN_EXPIRY
    return jwt.sign(data, jwtSecret, {expiresIn} as SignOptions)
}

export function generateRefreshToken (data: JwtPayloadType) {
    const jwtSecret = envConfig.JWT.SECRET
    const expiresIn = envConfig.JWT.REFRESH_TOKEN_EXPIRY
    return jwt.sign(data, jwtSecret, {expiresIn} as SignOptions)    
}

export function jwtVerify (token: string) {
    const jwtVerify = envConfig.JWT.SECRET
    return jwt.verify(token, jwtVerify) as JwtPayloadType
}
