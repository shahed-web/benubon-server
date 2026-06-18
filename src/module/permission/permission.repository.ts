import { PermissionCreateInput, PermissionUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { OrderBy } from "./permission.types";

export class PermissionRepository {
    async createPermission(data: PermissionCreateInput) {
         return await prisma.permission.create({
            data
        })
    }

    async updatePermission(id: string, data: PermissionUpdateInput) {
        return await prisma.permission.update({
            where:{
                id: id
            },
            data: data           
        })
    }
    
    async getAllPermissions(skip: number, limit: number, orderBy: OrderBy) {

            const [permissions, total] = await prisma.$transaction([
            prisma.permission.findMany({
                    skip: skip,
                    take: limit,
                    orderBy: orderBy!,
                    where: {
                        isSoftDelete: false
                    }
            }),
            prisma.permission.count()
        ])
        return {permissions, total}
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