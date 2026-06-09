import { RoleRepository } from "./role.repository";
import type { RoleInput } from "./role.validations";

const repository = new RoleRepository()
export class RoleService {
    async getRoles() {
        return await repository.getRoles()
    }

    async createRole (data: RoleInput) {
        return await repository.createRole(data)
    }

    async getRoleById (id: string) {
        return await repository.getRoleById(id)
    }

    async assignPermission (roleId: string, permissionIds: string[]) {
        const data = permissionIds.map(permissionId => ({
            roleId,
            permissionId,
        }))
        await repository.assignPermission(data)
        return true
    }

    async updateRole (id: string, data: RoleInput) {
        return await repository.updateRole(id, data)
    }

    async softDelete (id: string) {
        await repository.softDeleteRole(id)
    }   

    async permanentDelete (id: string) {
        await repository.permanentDeleteRole(id)
    }
}