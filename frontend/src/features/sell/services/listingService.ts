import axiosClient from "@/services/axiosClient";
import { type CreateListingFormValues } from "@/types/listing";
import { type AxiosProgressEvent } from "axios";

export interface ImageUploadResult {
  name: string;
  url: string;
}

export interface UploadImageResponse {
  statusCode: number;
  error?: string;
  message: string;
  data: ImageUploadResult[];
}

export const listingService = {
  uploadImages(files: File[], onProgress?: (percent: number) => void) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("folder", "Popzy");

    return axiosClient.post<UploadImageResponse>("/upload/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (event: AxiosProgressEvent) => {
        if (event.total && onProgress) {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      },
    });
  },
  createPost(data: CreateListingFormValues) {
    return axiosClient.post("/posts", data);
  },
};
