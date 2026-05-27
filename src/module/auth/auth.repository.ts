import { prisma } from "../../lib/prisma";
import { AuthInput } from "./auth.validations";

export class AuthRepository {
    async userExists(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
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

    async createSession(refreshToken: string) {
        return await prisma.sessions.create({
            data: {
                token: refreshToken
            }
        })
    }

    async deleteSession(refreshToken: string) {
        return await prisma.sessions.delete({
                where: {
                    token: refreshToken
                }
            })
    }

    async getSession(refreshToken: string) {
        return await prisma.sessions.findUnique({
            where: {
                token: refreshToken
            }
        })
    }
}