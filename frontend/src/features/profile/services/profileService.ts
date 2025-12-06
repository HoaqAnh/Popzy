import axiosClient from "@/services/axiosClient";
import type { User } from "@/types/realestate";

export interface GetProfileResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: User;
}

export const profileService = {
  getProfile() {
    return axiosClient.get<GetProfileResponse>("/auth/info");
  },
};
