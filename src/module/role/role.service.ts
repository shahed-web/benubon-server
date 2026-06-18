import { RoleRepository } from "./role.repository";
import type { RoleInput } from "./role.validations";

const repository = new RoleRepository()
export class RoleService {
    async getRoles(page=1, limit=10) {
        const skip = (page - 1) * limit
        const orderBy = {
            createdAt: 'desc' as const
        } 
        const {roles, total} = await repository.getRoles(skip, limit, orderBy)
        return {
            roles,
             meta: {
                total,
            totalPages: Math.ceil(total / limit),
                currentPage: page,
                limit: limit,
                hasNextPage: page * limit < total,
                hasPreviousPage: page > 1
            }
        };
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