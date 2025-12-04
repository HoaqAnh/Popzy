import { useState } from "react";
import {
  listingService,
  type CreatePostRequest,
} from "../services/listingService";

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (data: CreatePostRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await listingService.createPost(data);

      if (response.data && response.data.statusCode === 200) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || "Tạo tin đăng thất bại");
      }
    } catch (err: any) {
      console.error("Create Post Error:", err);
      const msg =
        err.response?.data?.message || err.message || "Có lỗi kết nối xảy ra";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    isLoading,
    error,
  };
};
