import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { envConfig } from "../config/env.config";

export const r2Client = new S3Client({
  region: "auto",

  endpoint: 
    `https://${envConfig.CLOUDFLARE.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

  credentials: {
    accessKeyId: envConfig.CLOUDFLARE.R2_ACCESS_KEY,
    secretAccessKey: envConfig.CLOUDFLARE.R2_SECRET_KEY,
  },
});

export async function deleteMediaObject(
  objectKey: string
) {
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: objectKey,
    })
  );
}