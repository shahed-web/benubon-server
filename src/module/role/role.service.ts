import { prisma } from "../../lib/prisma";
import type { RoleInput } from "./role.validations";

export class RoleService {
    async getRoles() {
        const roles = await prisma.role.findMany()
        return roles
    }

    async createRole (data: RoleInput) {
        const role = await prisma.role.create({
            data
        })
        return role
    }

    async getRoleById (id: string) {
        const role = await prisma.role.findUnique({
            where: {
                id
            }
        })
        return role
    }

    async assignPermission (roleId: string, permissionIds: string[]) {
        const data = permissionIds.map(permissionId => ({
            roleId,
            permissionId,
        }))

        await prisma.rolePermission.createMany({
            data,
            skipDuplicates: true
        })

        return true
    }

    async updateRole (id: string, data: RoleInput) {
        const role = await prisma.role.update({
            where: {
                id
            },
            data
        })
        return role
    }

    async softDelete (id: string) {
        await prisma.role.update({
            where: {
                id
            },
            data: {
                deletedAt: new Date()
            }
        })
    }   

    async permanentDelete (id: string) {
        await prisma.role.delete({
            where: {
                id
            }
        })
    }
}