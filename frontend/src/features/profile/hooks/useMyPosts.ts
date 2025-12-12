import { useState, useEffect } from "react";
import { profileService, type MyPostRaw } from "../services/profileService";
import type { Post } from "@/types/realestate";
import { getCloudinaryUrl } from "@/utils/image";

export const useMyPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const storedUser = localStorage.getItem("popzy-user");
        if (!storedUser) {
          throw new Error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        }

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser.id;

        if (!userId) {
          throw new Error("ID người dùng không hợp lệ.");
        }

        const response = await profileService.getMyPosts(userId);

        if (response.data && response.data.statusCode === 200) {
          const rawPosts = response.data.data.content;
          const mappedPosts: Post[] = rawPosts.map((item: MyPostRaw) => ({
            id: item.id,
            title: item.name,
            price: item.price,
            description: item.description,
            areaM2: item.properties.area,
            beds: item.properties.bedrooms ?? 0,
            baths: item.properties.bathroom ?? 0,
            address: {
              district: item.properties.district,
              city: item.properties.city,
            },
            images: item.images.map((img) => getCloudinaryUrl(img.url)),
            userId: item.user.id,
            created_at: item.createAt,
            likes: 0,
            views: 0,
            marketPrice: item.price,
            priceHistoryPercent: 0,
            floors: item.properties.floors,
            frontage: item.properties.frontage,
            access_road: item.properties.accessRoad,
            house_direction: item.properties.houseDirection,
            balcony_direction: item.properties.balconyDirection,
            legal_status: item.properties.legalStatus,
            furniture: item.properties.furniture,
          }));

          setPosts(mappedPosts);
        } else {
          throw new Error(response.data?.message || "Lấy danh sách thất bại");
        }
      } catch (err: any) {
        console.error("Fetch my posts error:", err);
        setError(err.message || "Có lỗi xảy ra khi tải tin đăng");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (postId: number) => {
    try {
      const response = await profileService.deletePost(postId);
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
        return { success: true, message: "Xóa tin thành công" };
      } else {
        throw new Error("Xóa thất bại");
      }
    } catch (err: any) {
      console.error("Delete error:", err);
      return { success: false, message: err.message || "Có lỗi xảy ra khi xóa" };
    }
  };

  return { posts, isLoading, error, deletePost };
};
