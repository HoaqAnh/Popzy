import { useEffect, useState } from "react";
import { favoriteService } from "@/features/favorite/favoriteService";
import type { FavoritePost } from "@/features/favorite/favoriteService";
import FavoritePostCard from "./FavoritePostCard";

const FavoriteListPage = () => {
  const [posts, setPosts] = useState<FavoritePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    favoriteService
      .getFavorites()
      .then((res) => {
        setPosts(res.data.data ?? res.data);
      })
      .catch(() => setError("Không thể tải danh sách yêu thích"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải bài viết yêu thích...</p>;
  if (error) return <p>{error}</p>;

  if (posts.length === 0) return <p>Bạn chưa có bài viết yêu thích nào </p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Bài viết yêu thích</h2>

      <div style={{ display: "grid", gap: 16 }}>
        {posts.map((post) => (
          <FavoritePostCard
            key={post.id}
            post={post}
            onUnliked={() =>
              setPosts((prev) => prev.filter((p) => p.id !== post.id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteListPage;
