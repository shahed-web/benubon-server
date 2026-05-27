import _ from "lodash"
import { AUTH_MESSAGES } from "../../constant/messages";
import { prisma } from "../../lib/prisma";
import { hashPassword, validatePassword } from "../../provider/bcrypt.provider";
import { generateJWT, jwtVerify } from "../../provider/jwt.provider";
import { AlreadyExistsError, NotFoundError, UnauthorizedError } from "../../utils/errors/app-error";
import type { AuthInput } from "./auth.validations";
import { envConfig } from "../../config/env.config";
import type { JwtPayloadType } from "./auth.types";
import { AuthRepository } from "./auth.repository";

const repository = new AuthRepository()
export class AuthService {
    async register (data: AuthInput) {
        const userExists = await repository.userExists(data.email)
        if(userExists) {
            throw new AlreadyExistsError(AUTH_MESSAGES.REGISTER.EXISTS)
        }
        const hashedPassword = await hashPassword(data.password)
        
        const registeredUser = await repository.createUser(data, hashedPassword)    

        return registeredUser
    }

    async login (data: AuthInput) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true
                            }
                        }
                    }
                }
            }
        })

        if (!user) {
            throw new NotFoundError(AUTH_MESSAGES.LOGIN.USER_NOT_FOUND)
        }

        const validateUser = await validatePassword(data.password, user.password)

        if (!validateUser) throw new UnauthorizedError(AUTH_MESSAGES.LOGIN.FAILED)

        const permissions = user.role?.permissions.map(item => item.permission.name) || []
        
        const jwtPayload: JwtPayloadType = {
            id: user.id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            role: user.role?.name || "",
            permissions
        }

        const accessToken = generateJWT(jwtPayload, envConfig.JWT.ACCESS_TOKEN_EXPIRY)
        
        const refreshToken = generateJWT({
            ... jwtPayload,
            tokenId:envConfig.JWT.REFRESH_TOKEN_ID
        }, envConfig.JWT.REFRESH_TOKEN_EXPIRY)
        
        await prisma.sessions.create({
            data: {
                token: refreshToken
            }
        })

        return {
            user, accessToken, refreshToken
        }
    
    }

    async refreshTokenHandler (refreshToken: string) {
        let decoded;
        try {
            decoded = jwtVerify(refreshToken) as JwtPayloadType
        } catch (error) {
            await prisma.sessions.delete({
                where: {
                    token: refreshToken
                }
            })
            return {success: false}
        }

        const storedToken = await prisma.sessions.findUnique({
            where: {
                token: refreshToken
            }
        })

        if(!storedToken) {
            throw new UnauthorizedError(AUTH_MESSAGES.AUTHORIZE.FAILED)
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            },
            include: {
                role: {
                    include: {
                        permissions: {
                            include: {
                                permission: true
                            }
                        }
                    }
                }
            }
        })

        if (!user) {
            throw new UnauthorizedError("User not found")
        }

        const permissions = user.role?.permissions.map(item => item.permission.name) || []
        
        const jwtPayload: JwtPayloadType = {
            id: user.id,
            name: user.name,
            email: user.email,
            isActive: user.isActive,
            role: user.role?.name || "",
            permissions
        }
        const accessToken = generateJWT(jwtPayload, envConfig.JWT.ACCESS_TOKEN_EXPIRY)
        return {
            success: true,
            accessToken: accessToken
        }
    }
}