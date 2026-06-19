import { PermissionRepository } from "./permission.repository";
import { generatePermissionCode } from "./permission.utils";
import type { PermissionInput } from "./permission.validations";

const repository = new PermissionRepository()
export class PermissionService {
    async createPermission (data: PermissionInput) {
    
       const permissionCode = generatePermissionCode(data)
       const permissionData = {
        name: data.name,
        description: data.description,
        permissionCode: permissionCode
       }
       return await repository.createPermission(permissionData)
    }

    async updatePermission (id: string, data: PermissionInput) {
       const permissionCode = generatePermissionCode(data)
       const permissionData = {
        name: data.name,
        description: data.description,
        permissionCode: permissionCode
       }
        return await repository.updatePermission(id, permissionData)
    }

    async getAllPermissions (page=1, limit=10) {
        const skip = (page - 1) * limit
        const orderBy = {
            createdAt: 'desc' as const
        } 
       const {permissions, total}   = await repository.getAllPermissions(skip, limit, orderBy);
        return {
            permissions,
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

    async getPermissionById (id: string) {
        return await repository.getPermissionById(id)
    }


    async deletePermission (id: string) {
        await repository.deletePermission(id)
    }
}