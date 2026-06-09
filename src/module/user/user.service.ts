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

    async viewUser(id: string) {
        return await repository.getUserById(id)
    }
    
    async assignRole(userId: string, roleId: string) {
        await repository.assignRole(userId, roleId)
    }
}