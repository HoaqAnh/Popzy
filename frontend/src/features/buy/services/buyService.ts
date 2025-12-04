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

export const buyService = {
  getPosts() {
    return axiosClient.get<GetPostsResponse>("/posts");
  },
};
