import { SortOrder } from "../../generated/prisma/internal/prismaNamespace";

 export interface RoleResponse {
    success: boolean;
    message: string;
    data?: { 
        id: number;
        name: string;
        description: string;  
    }
}

export interface OrderBy {
    createdAt: SortOrder;
    sortBy?: 'createdAt' | 'name';
    filterBy?: 'name' | 'sku';
}