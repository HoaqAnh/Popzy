import { useState } from "react";
import {
  listingService,
  type ImageUploadResult,
} from "../services/listingService";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const uploadImages = async (files: File[]) => {
    setIsUploading(true);
    setUploadError(null);
    setProgress(0);

    try {
      const response = await listingService.uploadImages(files, (percent) => {
        setProgress(percent);
      });

      return {
        success: true,
        data: response.data.data as ImageUploadResult[],
      };
    } catch (err: any) {
      const msg = err.response?.data?.message || "Upload thất bại";
      console.error("Upload error:", err);
      setUploadError(msg);
      return { success: false, error: msg };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImages,
    isUploading,
    uploadError,
    progress,
  };
};
