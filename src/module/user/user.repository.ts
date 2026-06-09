import { UserCreateInput, UserUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export class UserRepository {
    async createUser (data: UserCreateInput) {
        return prisma.user.create({
            data
        })
    }
    async getUserById (id: string) {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        })
    }
    async assignRole (userId: string, roleId: string) {
        return prisma.user.update({
            where: {
                id: userId
            },
            data: {
                roleId
            }
        })
    }
    async updateUser (id: string, data: UserUpdateInput) {}
    async softDeleteUser (id: string) {}    
    async deleteUser (id: string) {}    
}