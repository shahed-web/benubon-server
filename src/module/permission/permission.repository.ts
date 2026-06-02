import { PermissionCreateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export class PermissionRepository {
    async createPermission(data: PermissionCreateInput) {
         return await prisma.permission.create({
            data
        })
    }

    async updatePermission(id: string, data: PermissionCreateInput) {
        return await prisma.permission.update({
            where:{
                id: id
            },
            data: data           
        })
    }
    async getAllPermissions() {
        return await prisma.permission.findMany()
    }

    async getPermissionById(id: string) {
        return await prisma.permission.findUnique({
            where: {
                id: id
            }
        })
    }

    async deletePermission(id: string) {
        await prisma.permission.delete({
            where: {
                id: id
            }
        })
    }

}