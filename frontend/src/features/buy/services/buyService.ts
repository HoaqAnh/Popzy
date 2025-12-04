import axiosClient from "@/services/axiosClient";

export interface BuyPostItem {
  id: number;
  name: string;
  description: string;
  price: number;
  area: number;
  bedrooms: number | null;
  bathroom: number | null;
  district: string;
  city: string;
  fullname: string;
  imageUrl: string | null;
}

export interface GetPostsResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: BuyPostItem[];
}

export interface PostDetailProperties {
  area: number;
  frontage?: number | null;
  accessRoad?: number | null;
  floors?: number | null;
  bedrooms?: number | null;
  bathroom?: number | null;
  houseDirection?: string | null;
  balconyDirection?: string | null;
  legalStatus?: string | null;
  furniture?: string | null;
  district: string;
  city: string;
}

export interface PostDetailImage {
  id: number;
  url: string;
  post: number;
}

export interface PostDetailData {
  id: number;
  name: string;
  description: string;
  price: number;
  createAt: string;
  updateAt: string;
  properties: PostDetailProperties;
  images: PostDetailImage[];
  videos: any[];
}

export interface GetPostDetailResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: PostDetailData;
}

export const buyService = {
  getPosts() {
    return axiosClient.get<GetPostsResponse>("/posts");
  },

  getPostDetail(id: number) {
    return axiosClient.get<GetPostDetailResponse>(`/posts/${id}`);
  },
};
