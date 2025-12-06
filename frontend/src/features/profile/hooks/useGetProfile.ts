import { useState, useEffect, useCallback } from "react";
import { profileService } from "../services/profileService";
import type { User } from "@/types/realestate";

export const useGetProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await profileService.getProfile();

      if (response.data && response.data.statusCode === 200) {
        setUser(response.data.data);
      } else {
        throw new Error(response.data.message || "Không thể lấy thông tin tài khoản");
      }
    } catch (err: any) {
      console.error("Fetch profile error:", err);
      const msg = err.response?.data?.message || err.message || "Có lỗi kết nối xảy ra";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};
