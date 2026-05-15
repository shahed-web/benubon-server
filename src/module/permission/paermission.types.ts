export interface PermissionResponse {
    success: boolean;
    message: string;
    data?: { 
        id: number;
        name: string;
        description: string;  
    }
}