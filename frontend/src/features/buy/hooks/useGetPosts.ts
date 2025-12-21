import { useQuery } from "@tanstack/react-query";
import { buyService, type BuyPostItem } from "../services/buyService";
import type { Post, User } from "@/types/realestate";
import { getCloudinaryUrl } from "@/utils/image";

export type CleanListingItem = {
  post: Post;
  user: User;
};

const fetchPostsData = async (): Promise<CleanListingItem[]> => {
  const response = await buyService.getPosts();

  if (response.data && response.data.statusCode === 200) {
    return response.data.data.map((item: BuyPostItem) => {
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
  } else {
    throw new Error(response.data?.message || "Lấy dữ liệu thất bại");
  }
};

export const useGetPosts = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPostsData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data: data || [],
    isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
  };
};
