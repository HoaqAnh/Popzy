import { useState, useEffect } from "react";
import { buyService } from "../services/buyService";
import type { Post, User } from "@/types/realestate";
import { getCloudinaryUrl } from "@/utils/image";

type CacheEntry = {
  post: Post;
  user: User;
  fetchedAt: number;
};

const detailCache: Record<string, CacheEntry> = {};

const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

export const useGetPostDetail = (id: number | undefined) => {
  // Helper check cache
  const getCachedData = (postId?: number) => {
    if (!postId || !detailCache[postId]) return null;
    const entry = detailCache[postId];
    const isFresh = Date.now() - entry.fetchedAt < CACHE_DURATION;
    return isFresh ? entry : null;
  };

  const cachedEntry = getCachedData(id);

  const [post, setPost] = useState<Post | null>(cachedEntry?.post || null);
  const [user, setUser] = useState<User | null>(cachedEntry?.user || null);
  const [isLoading, setIsLoading] = useState(!cachedEntry);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const validCache = getCachedData(id);
    if (validCache) {
      setPost(validCache.post);
      setUser(validCache.user);
      setIsLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await buyService.getPostDetail(Number(id));

        if (response.data && response.data.statusCode === 200) {
          const rawData = response.data.data;
          const props = rawData.properties;
          const rawUser = rawData.user;

          const mappedPost: Post = {
            id: rawData.id,
            title: rawData.name,
            price: rawData.price,
            description: rawData.description,
            areaM2: props.area,
            beds: props.bedrooms ?? 0,
            baths: props.bathroom ?? 0,
            address: {
              district: props.district,
              city: props.city,
            },
            images:
              rawData.images.length > 0
                ? rawData.images.map((img) => getCloudinaryUrl(img.url))
                : ["https://picsum.photos/seed/realestate/800/600"],
            created_at: rawData.createAt,
            floors: props.floors ?? undefined,
            frontage: props.frontage ?? undefined,
            access_road: props.accessRoad ?? undefined,
            house_direction: props.houseDirection ?? undefined,
            balcony_direction: props.balconyDirection ?? undefined,
            legal_status: props.legalStatus ?? undefined,
            furniture: props.furniture ?? undefined,
            userId: rawUser.id,
            likes: 0,
            marketPrice: rawData.price * 1.02,
            priceHistoryPercent: 1.5,
            views: 0,
          };

          const mappedUser: User = {
            id: rawUser.id,
            fullname: rawUser.fullname,
            email: rawUser.email,
            phone: rawUser.phone,
            imageUrl: rawUser.imageUrl ? getCloudinaryUrl(rawUser.imageUrl) : "",
          };

          detailCache[id] = {
            post: mappedPost,
            user: mappedUser,
            fetchedAt: Date.now(),
          };

          setPost(mappedPost);
          setUser(mappedUser);
        } else {
          throw new Error(response.data?.message || "Không tìm thấy bài viết");
        }
      } catch (err: any) {
        console.error("Fetch detail error:", err);
        setError(err.message || "Có lỗi xảy ra khi tải chi tiết tin đăng");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { post, user, isLoading, error };
};
