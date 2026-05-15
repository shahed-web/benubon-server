import { prisma } from "../../lib/prisma";

export class UserService {
    async assignRole(userId: string, roleId: string) {
        return prisma.user.update({
            where: {
                id: userId
            },
            data: {
                roleId
            }
        })
    }
}