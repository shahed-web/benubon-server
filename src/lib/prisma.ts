// import "dotenv/config";
import dotenv from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
dotenv.config()
// const connectionString = `${envConfig.NODE_ENV === "development" ? process.env.DATABASE_LOCAL_URL : process.env.DATABASE_URL}`
const connectionString = `${process.env.DATABASE_URL}`
if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }