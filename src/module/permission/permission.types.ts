import { SortOrder } from "../../generated/prisma/internal/prismaNamespaceBrowser";

export interface PermissionResponse {
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