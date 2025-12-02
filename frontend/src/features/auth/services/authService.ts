import axiosClient from "@/services/axiosClient";
import type { User } from "@/types/realestate";

export interface RegisterRequest {
  email: string;
  phone: string;
  password: string;
  fullname: string;
}

export interface RegisterResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: User;
}

export const authService = {
  register(data: RegisterRequest) {
    return axiosClient.post<RegisterResponse>("/auth/register", data);
  },
};
