import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export const useLogout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      localStorage.removeItem("popzy-user");
      localStorage.removeItem("popzy-auth-token");
      setIsLoading(false);
      navigate("/auth/login");
    }
  };

  return { logout, isLoading };
};
