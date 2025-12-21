import axiosClient from "@/services/axiosClient";

export interface FavoritePost {
  id: number;
  name: string;
  price: number;
  description?: string;
  images?: {
    imageUrl: string;
  }[];
}

export const favoriteService = {
  getFavorites() {
    return axiosClient.get("/favorites");
  },
  likePost(postId: number) {
    return axiosClient.post(`/favorites/${postId}`);
  },

  unlikePost(postId: number) {
    return axiosClient.delete(`/favorites/${postId}`);
  },

  checkLiked(postId: number) {
    return axiosClient.get(`/favorites/check/${postId}`);
  },
};
