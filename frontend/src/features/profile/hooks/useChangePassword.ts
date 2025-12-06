import { useState } from "react";
import { profileService, type ResetPasswordRequest } from "../services/profileService";

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (data: ResetPasswordRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await profileService.resetPassword(data);

      if (response.status === 200) {
        return { success: true, message: response.data.message || "Đổi mật khẩu thành công" };
      } else {
        throw new Error(response.data.message || "Đổi mật khẩu thất bại");
      }
    } catch (err: any) {
      console.error("Change password error:", err);
      const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changePassword,
    isLoading,
    error,
  };
};
