import { prisma } from "../../lib/prisma";
import { AuthInput } from "./auth.validations";

export class AuthRepository {
    async userExists(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async createUser (data: AuthInput, hashedPassword: string) {
        return await prisma.user.create({
            data: {
                name: data.name!,
                email: data.email,
                password: hashedPassword
            }
        })  
    }
}