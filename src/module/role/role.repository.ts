import { RoleCreateInput, RoleUpdateInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { OrderBy } from "./role.types";

export class RoleRepository {
    async getRoles(skip: number, limit: number, orderBy: OrderBy) {
        // return await prisma.role.findMany()

        const [roles, total] = await prisma.$transaction([
            prisma.role.findMany({
                skip: skip,
                take: limit,
                orderBy: orderBy!,
                where: {
                    isSoftDelete: false
                }
            }),
            prisma.role.count()
        ])

        return {roles, total}
    }

    async createRole (data: RoleCreateInput) {
        return await prisma.role.create({
            data
        })
    }

    async getRoleById (id: string) {
        return await prisma.role.findUnique({
            where: {
                id
            }
        })
    }

    async assignPermission (data: { roleId: string, permissionId: string }[]) {
        await prisma.rolePermission.createMany({
            data,
            skipDuplicates: true
        })
    }

    async updateRole (id: string, data: RoleUpdateInput) {
        await prisma.role.update({
            where: {
                id
            },
            data
        })
    }

    async softDeleteRole (id: string) {
        await prisma.role.update({
            where: {
                id
            },
            data: {
                isActive: false,
                deletedAt: new Date()
            }
        })
    }

    async permanentDeleteRole (id: string) {
        await prisma.role.delete({
            where: {
                id
            }
        })
    }
}