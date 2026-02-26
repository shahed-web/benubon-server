import type { Category } from "../category/category.types";

interface Product {
    id: number;
    name: string;
    sku: string;
    slug: string;
    categories: Category[];
    description: string;
    isActive: boolean;
    imagesReady: boolean;
    hsCode?: string | null;
    moq?: number | null;
    variants: ProductVariant[];
}

interface ProductImages {
    id: number;
    publicId: string;
    url: string;
    width?: number | null;
    height?: number | null;
    altText?: string | null;
    position?: number | null;

}

interface ProductVariant {
    id: number;
    productId: number;
    name: string;
    sku: string;
    material: string;
    size: string;
    color: string;
    weightKg?: number | null;
    lengthCm?: number | null;
    widthCm?: number | null;
    heightCm?: number | null;
    price?: Price[] | null;
    inventory?: Inventory | null;    
}

interface Price {
    id: number;
    currency: string;
    amount: number;
    minQty: number;
}

interface Inventory {
  id: number;
  quantity: number;
  warehouse: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductResponse {
    success: boolean;
    message: string;
    data?: { 
        id: number;
        name: string;
        slug: string;  
    }
}

export interface FetchProductResponse {
    success: boolean;
    message: string;
    data?: Product[]
}

export interface ProductParams {
    productId: number;
}


export interface ProductInputRequest {
    name: string;
    sku: string;
    description: string;
    hsCode: string;
    moq: string;
    categories: number[];
    variants?: ProductVariant[];
    images?: ProductImages[];
}