import { PermissionRepository } from "./permission.repository";
import type { PermissionInput } from "./permission.validations";

const repository = new PermissionRepository()
export class PermissionService {
    async createPermission (data: PermissionInput) {
       return await repository.createPermission(data)
    }

    async updatePermission (id: string, data: PermissionInput) {
        const permissionData = {
            name: data.name,
            description: data.description
        }
        return await repository.updatePermission(id, permissionData)
    }

    async getAllPermissions () {
        return await repository.getAllPermissions()
    }

    async getPermissionById (id: string) {
        return await repository.getPermissionById(id)
    }

    async deletePermission (id: string) {
        await repository.deletePermission(id)
    }

}