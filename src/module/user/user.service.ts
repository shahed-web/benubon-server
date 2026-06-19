import { hashPassword } from "../../provider/bcrypt.provider"
import { UserRepository } from "./user.repository"
import { UserInput } from "./user.validations"

const repository = new UserRepository()
export class UserService {
    async createUser(data: UserInput) {
        const hashedPassword = await hashPassword(data.password)
        const userObject = {
            name: data.name,
            email: data.email,
            roleId: data.roleId? data.roleId: undefined,
            password: hashedPassword,
            isActive: data.isActive? data.isActive : false
        }
        return repository.createUser(userObject)
    }

    async userDetails(id: string) {
        const user = await repository.getUserById(id)
        return user
    }
    
    async getUser(page=1, limit=10) {
        const skip = (page - 1) * limit
        const orderBy = {
            createdAt: 'desc' as const
        } 
        const {users, total} = await repository.getUsers(skip, limit, orderBy)
        return {
            users,
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

    async assignRole(userId: string, roleId: string) {
        await repository.assignRole(userId, roleId)
    }
}