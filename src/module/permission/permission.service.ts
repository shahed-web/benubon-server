import { prisma } from "../../lib/prisma";
import type { PermissionInput } from "./permission.validations";

export class PermissionService {
    async createPermission (data: PermissionInput) {
        return await prisma.permission.create({
            data
        })
    }

    async getAllPermissions () {
        const permission = await prisma.permission.findMany()
        return permission
    }
}