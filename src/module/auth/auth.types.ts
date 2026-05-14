export interface AuthInputRequest {
    name?: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: { 
        accessToken: string;
        refreshToken: string;
    }
}