import dotenv from 'dotenv'

dotenv.config() 

interface EnvConfig {
  NODE_ENV: string
  PORT: number
  DB : {
    DATABASE_URL: string
    DATABASE_LOCAL_URL: string
  }
  JWT: {
    SECRET: string
    ACCESS_TOKEN_EXPIRY: string
    REFRESH_TOKEN_EXPIRY: string
    REFRESH_TOKEN_ID: string
  },
  CLOUDFLARE: {
    R2_ACCOUNT_ID: string
    R2_ACCESS_KEY: string
    R2_SECRET_KEY: string
    R2_BUCKET_NAME: string
  }
}

export const envConfig: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000, 
  DB : {
    DATABASE_URL: process.env.DATABASE_URL as string,
    DATABASE_LOCAL_URL: process.env.DATABASE_LOCAL_URL as string
  },
  JWT: {
    SECRET: process.env.JWT_SECRET as string,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRED_AT as string,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRED_AT as string,
    REFRESH_TOKEN_ID: process.env.REFRESH_TOKEN_ID as string
  },
    CLOUDFLARE: {
    R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID as string,
    R2_ACCESS_KEY: process.env.R2_ACCESS_KEY as string,
    R2_SECRET_KEY: process.env.R2_SECRET_KEY as string,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME as string
  }
}