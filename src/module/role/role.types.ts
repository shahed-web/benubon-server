 export interface RoleResponse {
    success: boolean;
    message: string;
    data?: { 
        id: number;
        name: string;
        description: string;  
    }
}