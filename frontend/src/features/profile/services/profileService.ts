import axiosClient from "@/services/axiosClient";
import type { User } from "@/types/realestate";

export interface GetProfileResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: User;
}

export interface UpdateResponse {
  statusCode: number;
  error: string | null;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
}

export const profileService = {
  getProfile() {
    return axiosClient.get<GetProfileResponse>("/auth/info");
  },

  updateAvatar(publicId: string) {
    return axiosClient.put<UpdateResponse>("/auth/Avt", null, {
      params: { Avt: publicId },
    });
  },

  updateFullname(newName: string) {
    return axiosClient.put<UpdateResponse>("/auth/reName", null, {
      params: { newName },
    });
  },

  resetPassword(data: ResetPasswordRequest) {
    return axiosClient.put<UpdateResponse>("/auth/resetPw", data);
  },
};
