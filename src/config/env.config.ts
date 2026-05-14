import dotenv from 'dotenv'

dotenv.config() 

interface EnvConfig {
  NODE_ENV: string
  PORT: number
  JWT: {
    SECRET: string
    ACCESS_TOKEN_EXPIRY: string
    REFRESH_TOKEN_EXPIRY: string
    REFRESH_TOKEN_ID: string
  }
}

export const envConfig: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000, 

  JWT: {
    SECRET: process.env.JWT_SECRET as string,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRED_AT as string,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRED_AT as string,
    REFRESH_TOKEN_ID: process.env.REFRESH_TOKEN_ID as string
  }
}