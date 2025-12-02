import { useState } from "react";
import { authService, type RegisterRequest } from "../services/authService";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.register(data);
      if (response.data.statusCode === 200) {
        return { success: true, data: response.data.data };
      } else {
        throw new Error(response.data.message || "Đăng ký thất bại");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Có lỗi xảy ra";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};
