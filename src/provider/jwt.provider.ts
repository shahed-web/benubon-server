import jwt, { type SignOptions } from "jsonwebtoken";
import { envConfig } from "../config/env.config";

interface UserData {
    id: string,
    name: string,
    email: string,
    isActive: boolean
    tokenId?: string
}

export function generateJWT (data: UserData, expiresIn: string) {
    const jwtSecret = envConfig.JWT.SECRET
    return jwt.sign(data, jwtSecret, {expiresIn} as SignOptions)
}

export function jwtVerify (token: string) {
    const jwtVerify = envConfig.JWT.SECRET
    return jwt.verify(token, jwtVerify)
}