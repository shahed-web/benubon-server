import { prisma } from "../../lib/prisma";
import type { RoleInput } from "./role.validations";

export class RoleService {
    async createRole (data: RoleInput) {
        const role = await prisma.role.create({
            data
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
}