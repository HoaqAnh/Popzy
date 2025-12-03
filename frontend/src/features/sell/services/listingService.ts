import axiosClient from "@/services/axiosClient";
import { type AxiosProgressEvent } from "axios";

export interface PostProperty {
  area: number;
  frontage?: number | null;
  accessRoad?: number | null;
  floors?: number | null;
  bedrooms?: number | null;
  bathroom?: number | null;
  houseDirection?: string | null;
  balconyDirection?: string | null;
  legalStatus?: string | null;
  furniture?: string | null;
  district: string;
  city: string;
}

export interface CreatePostRequest {
  name: string;
  description: string;
  price: number;
  properties: PostProperty;
  images: { url: string }[];
  videos: { url: string }[];
}

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

export interface CreatePostResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: any;
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

  createPost(data: CreatePostRequest) {
    return axiosClient.post<CreatePostResponse>("/posts", data);
  },
};
