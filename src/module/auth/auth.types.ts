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

export interface JwtPayloadType {
    id: string,
    name: string,
    email: string,
    isActive: boolean
    tokenId?: string
    role: string
    permissions: string[]
}