import { PermissionInput } from "./permission.validations"

export const generatePermissionCode = (data: PermissionInput): string => {
    const actionHash = {
        view: 100,
        create: 101,
        update: 110,
        delete: 111
    } as const

    const resourceHash = {
        artisan: 1000,
        buyer: 1100,
        category: 1001,
        product: 1010,
        user: 1111,
        role: 1011,
        permission: 1110
    } as const

    const name = data.name
    const splitedPart = name.split('.')
    const action = splitedPart[0]
    const resource = splitedPart[1]

    const actionKey = action as keyof typeof actionHash
    const resourceKey = resource as keyof typeof resourceHash


    const code = `${actionHash[actionKey]}${resourceHash[resourceKey]}`
    
    return code
}