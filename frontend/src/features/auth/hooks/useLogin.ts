import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, type LoginRequest } from "../services/authService";

const JWT_KEY = "popzy-auth-token";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login(data);
      const resData = response.data;

      if (resData.statusCode === 200 && resData.data) {
        localStorage.setItem(JWT_KEY, resData.data.access_token);

        localStorage.setItem("popzy-user", JSON.stringify(resData.data.userLogin));

        alert("Đăng nhập thành công!");
        navigate("/");

        return { success: true };
      } else {
        throw new Error(resData.message || "Đăng nhập thất bại");
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
    login,
    isLoading,
    error,
  };
};
