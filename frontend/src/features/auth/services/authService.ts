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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  userLogin: User;
  access_token: string;
}

export interface LoginResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: LoginResponseData;
}

export const authService = {
  register(data: RegisterRequest) {
    return axiosClient.post<RegisterResponse>("/auth/register", data);
  },
  login(data: LoginRequest) {
    return axiosClient.post<LoginResponse>("/auth/login", data);
  },
  logout: () => {
    return axiosClient.post("/auth/logout");
  },
};
