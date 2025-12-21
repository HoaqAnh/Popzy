import { useQuery } from "@tanstack/react-query";
import { buyService } from "../services/buyService";
import type { Post, User } from "@/types/realestate";
import { getCloudinaryUrl } from "@/utils/image";

type DetailData = {
  post: Post;
  user: User;
};

const fetchPostDetailData = async (id: number): Promise<DetailData> => {
  const response = await buyService.getPostDetail(id);

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
      views: 0,
    };

    const mappedUser: User = {
      id: rawUser.id,
      fullname: rawUser.fullname,
      email: rawUser.email,
      phone: rawUser.phone,
      imageUrl: rawUser.imageUrl ? getCloudinaryUrl(rawUser.imageUrl) : "",
    };

    return { post: mappedPost, user: mappedUser };
  } else {
    throw new Error(response.data?.message || "Không tìm thấy bài viết");
  }
};

export const useGetPostDetail = (id: number | undefined) => {
  const postId = id ? Number(id) : 0;

  const { data, isLoading, error } = useQuery({
    queryKey: ["post-detail", postId],
    queryFn: () => fetchPostDetailData(postId),
    enabled: !!postId && postId > 0,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  return {
    post: data?.post || null,
    user: data?.user || null,
    isLoading,
    error: error instanceof Error ? error.message : null,
  };
};
