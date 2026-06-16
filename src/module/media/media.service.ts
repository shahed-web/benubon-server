import crypto from "crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { deleteMediaObject, r2Client } from "../../provider/cloudflare-r2.provider";
import {  UploadIntentFile } from "./media.type";


export class MediaService {

  async generateUploadUrls( id: number, entity: string, files: UploadIntentFile[]) {
    return Promise.all(
      files.map(async file => {

        const objectKey = `${entity}/${id}/${crypto.randomUUID()}-${file.fileName}`;
        
          const command = new PutObjectCommand({
            Bucket:process.env.R2_BUCKET_NAME!,
            Key: objectKey,
            ContentType: file.mimeType,
        });

        const signedUrl = await getSignedUrl(
            r2Client,
            command,
            {
                expiresIn: 300
            }
        );

        return {
          objectKey,
          signedUrl
        };
      })
    );
  }

  async deleteFiles( objectKeys: string[]) {
    await Promise.all(
      objectKeys.map(key =>
        deleteMediaObject(key)
      )
    );
}
}