import { useState, useEffect } from "react";
import { buyService, type BuyPostItem } from "../services/buyService";
import type { Post, User } from "@/types/realestate";

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
        const mappedData: CleanListingItem[] = response.data.data.map(
          (item: BuyPostItem, index: number) => {
            const mockUserId = `user-${index}`;

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
              images: ["https://picsum.photos/seed/realestate/600/400"],
              userId: mockUserId,
              likes: 0,
              created_at: new Date().toISOString(),
              marketPrice: item.price * 1.05,
              priceHistoryPercent: 2.5,
            };

            const user: User = {
              id: mockUserId,
              imageUrl: item.imageUrl
                ? item.imageUrl
                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200",
              fullname: item.fullname,
              email: "contact@popzy.com",
              phone: "",
            };

            return { post, user };
          }
        );

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
