import { SortOrder } from "../../generated/prisma/internal/prismaNamespace";

export interface OrderBy {
    createdAt: SortOrder;
    sortBy?: 'createdAt' | 'name';
    filterBy?: 'name' | 'sku';
}