import { SortOrder } from "../../generated/prisma/internal/prismaNamespace";

export interface Category {
    id: number;
    name: string;
    slug: string;
    imgUrl?: string | null;
    parentId?: number | null;
    createdAt: Date;
    updatedAt: Date;
    children?: Category[]
}

export interface CategoryInputRequest {
    name: string;
    parentSlug?: string;
}

export interface CategoryResponse {
    success: boolean;
    message: string;
    data?: { 
        id: number;
        name: string;
        slug: string;  
    }
}

export interface FetchCategoryResponse {
    success: boolean;
    message: string;
    data?: {
        categories: Category[];
        meta: {
            total: number;
        }
    }
}

export interface CategoryParams {
    categoryId: number;
}

export interface OrderBy {
    createdAt: SortOrder;
    sortBy?: 'createdAt' | 'name';
    filterBy?: 'name' | 'sku';
}