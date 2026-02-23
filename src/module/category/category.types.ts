interface Category {
    id: number;
    name: string;
    slug: string;
    imgUrl?: string | null;
    parentId?: number | null;
    createdAt: Date;
    updatedAt: Date;
    children?: Category[]
}

export interface CreateCategoryRequest {
    name: string;
    parentSlug?: string;
}

export interface CreateCategoryResponse {
    success: boolean;
    message: string;
    data?: { 
        name: string;
        slug: string;  
    }
}

export interface FetchCategoryResponse {
    success: boolean;
    message: string;
    data?: Category[]
}