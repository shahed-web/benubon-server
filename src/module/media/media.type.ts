import z from "zod";
import { completeUploadSchema } from "./media.validation";

export interface UploadIntentFile {
  fileName: string;
  mimeType: string;
}

export interface UploadIntentRequest {
  id: number;
  entity: string;
  files: UploadIntentFile[];
}

export interface CompleteUploadFile {
  fileName: string;
  objectKey: string;
  mimeType: string;
  size?: number;
}

export type CompleteUploadRequest = z.infer<typeof completeUploadSchema>;