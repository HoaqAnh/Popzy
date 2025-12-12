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

export interface MyPostRaw {
  id: number;
  name: string;
  description: string;
  price: number;
  createAt: string;
  updateAt: string;
  user: {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    imageUrl: string | null;
  };
  properties: {
    id: number;
    post: number;
    area: number;
    frontage?: number;
    accessRoad?: number;
    floors?: number;
    bedrooms?: number;
    bathroom?: number;
    houseDirection?: string;
    balconyDirection?: string;
    legalStatus?: string;
    furniture?: string;
    district: string;
    city: string;
  };
  images: {
    id: number;
    url: string;
    post: number;
  }[];
  videos: any[];
}

export interface GetMyPostsResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: {
    content: MyPostRaw[];
    page: {
      size: number;
      number: number;
      totalElements: number;
      totalPages: number;
    };
  };
}

export interface GenericResponse {
  statusCode: number;
  error: string | null;
  message: string;
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

  getMyPosts(userId: number) {
    return axiosClient.get<GetMyPostsResponse>(`/posts/${userId}/posts`);
  },

  deletePost(postId: number) {
    return axiosClient.delete<GenericResponse>(`/posts/${postId}`);
  },
};
