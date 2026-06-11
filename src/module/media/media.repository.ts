import { prisma } from "../../lib/prisma";
import { CompleteUploadRequest } from "./media.type";

export class MediaRepository {

  async completeUpload(payload: CompleteUploadRequest) {

    return prisma.$transaction(
      async (tx) => {

        const product = await tx.product.findUnique({
            where: {
              id: payload.productId,
            },
            select: {
              id: true,
            },
          });

        if (!product) {
          throw new Error(
            "Product not found"
          );
        }

        const mediaRecords = [];

        
        for (const file of payload.files) {
          const media = await tx.media.create({
              data: {
                fileName: file.fileName,
                objectKey: file.objectKey,
                mimeType:file.mimeType,
                size: file.size ?? null,
              },
            });

          mediaRecords.push(media);

          await tx.productImage.create({
            data: {
              productId: payload.productId,
              mediaId: media.id,
            },
          });
        }

        await tx.product.update({
          where: {
            id: payload.productId,
          },
          data: {
            status: "ACTIVE",
          },
        });

        return {
          productId: payload.productId,
          uploadedImages: mediaRecords.length,
          media: mediaRecords,
        };
      }
    );
  }
}
