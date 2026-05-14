import { AUTH_MESSAGES } from "../../constant/messages";
import { prisma } from "../../lib/prisma";
import { hashPassword, validatePassword } from "../../provider/bcrypt.provider";
import { AlreadyExistsError, NotFoundError, UnauthorizedError } from "../../utils/errors/app-error";
import type { AuthInput } from "./auth.validations";

export class AuthService {
    async register (data: AuthInput) {
        const userExists = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(userExists) {
            throw new AlreadyExistsError(AUTH_MESSAGES.REGISTER.EXISTS)
        }
        
        const hashedPassword = await hashPassword(data.password)
        
        const registeredUser = await prisma.user.create({
            data: {
                name: data.name!,
                email: data.email,
                password: hashedPassword
            }
        })

        return registeredUser
    }

    async login (data: AuthInput) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (!user) {
            throw new NotFoundError(AUTH_MESSAGES.LOGIN.USER_NOT_FOUND)
        }

        const validateUser = await validatePassword(data.password, user.password)

        if (!validateUser) throw new UnauthorizedError(AUTH_MESSAGES.LOGIN.FAILED)

        return user
    
    }
}