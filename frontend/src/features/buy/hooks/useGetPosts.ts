import { useState, useEffect } from "react";
import { buyService, type BuyPostItem } from "../services/buyService";
import type { Post, User } from "@/types/realestate";
import { getCloudinaryUrl } from "@/utils/image";

export type CleanListingItem = {
  post: Post;
  user: User;
};

const memoryCache: {
  data: CleanListingItem[] | null;
  fetchedAt: number;
} = {
  data: null,
  fetchedAt: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

export const useGetPosts = () => {
  const [data, setData] = useState<CleanListingItem[]>(memoryCache.data || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await buyService.getPosts();

      if (response.data && response.data.statusCode === 200) {
        const mappedData: CleanListingItem[] = response.data.data.map((item: BuyPostItem) => {
          const postImages =
            item.listImage && item.listImage.length > 0
              ? item.listImage.map((img) => getCloudinaryUrl(img.url))
              : ["https://picsum.photos/seed/realestate/600/400"];

          const userAvatar = item.imageUrl ? getCloudinaryUrl(item.imageUrl) : "";

          const post: Post = {
            id: item.id,
            title: item.name,
            price: item.price,
            areaM2: item.area,
            beds: item.bedrooms ?? 0,
            baths: item.bathroom ?? 0,
            address: {
              district: item.district,
              city: item.city,
            },
            description: item.description,
            images: postImages,
            userId: item.id_user,
            likes: 0,
            created_at: new Date().toISOString(),
          };

          const user: User = {
            id: item.id_user,
            imageUrl: userAvatar,
            fullname: item.fullname,
            email: "contact@popzy.com",
            phone: "",
          };

          return { post, user };
        });

        memoryCache.data = mappedData;
        memoryCache.fetchedAt = Date.now();

        setData(mappedData);
      } else {
        throw new Error(response.data?.message || "Lấy dữ liệu thất bại");
      }
    } catch (err: any) {
      console.error("Fetch posts error:", err);
      setError(err.message || "Có lỗi xảy ra khi tải danh sách");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const now = Date.now();
    const isCacheValid = memoryCache.data && now - memoryCache.fetchedAt < CACHE_DURATION;

    if (isCacheValid) {
      setIsLoading(false);
    } else {
      fetchPosts();
    }
  }, []);

  const forceRefetch = () => {
    memoryCache.data = null;
    fetchPosts();
  };

  return { data, isLoading, error, refetch: forceRefetch };
};
