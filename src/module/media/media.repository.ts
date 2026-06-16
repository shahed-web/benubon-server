import { prisma } from "../../lib/prisma";
import { CompleteUploadFile } from "./media.type";

export class MediaRepository {
  async createMedia(data:CompleteUploadFile) {
    return await prisma.media.create({
      data
    })
  }

  async deleteMedia (id:string) {
    await prisma.media.delete({
      where: {
        id
      }
    })
  }
}
