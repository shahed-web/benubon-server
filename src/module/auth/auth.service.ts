import _ from "lodash"
import { AUTH_MESSAGES, USER_MESSAGES } from "../../constant/messages";
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
        const user = await repository.userExists(data.email)

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
        
        await repository.createSession(refreshToken)

        return {
            user, accessToken, refreshToken
        }
    
    }

    async refreshTokenHandler (refreshToken: string) {
        let decoded;
        try {
            decoded = jwtVerify(refreshToken) as JwtPayloadType
        } catch (error) {
            await repository.deleteSession(refreshToken)
            return {success: false}
        }

        const storedToken = await repository.getSession(refreshToken)

        if(!storedToken) {
            throw new UnauthorizedError(AUTH_MESSAGES.AUTHORIZE.FAILED)
        }
        
        const user = await repository.userExists(decoded.email)

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

    async authUserData (id: string, refreshToken: string) {
        const userData = await repository.authUser(id) 
        const permissions = userData?.role?.permissions.map(item => item.permission.name) || []
        if(!userData) {
            throw new NotFoundError("User not found")
        }

        const sessionToken = await repository.getSession(refreshToken)
        if (!sessionToken) {
            throw new UnauthorizedError(AUTH_MESSAGES.AUTHORIZE.INVALID_SESSION)
        }

        const jwtPayload: JwtPayloadType = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isActive: userData.isActive,
            role: userData.role?.name || "",
            permissions
        }
        const accessToken = generateJWT(jwtPayload, envConfig.JWT.ACCESS_TOKEN_EXPIRY)

        const user = _.pick(userData, ["id", "name", "email", "role", "isActive"])

        return {
            user,
            permissions,
            accessToken,
            refreshToken
        }
    }

    async revokeSession(token: string) {
        await repository.revokeSession(token)
    }
}