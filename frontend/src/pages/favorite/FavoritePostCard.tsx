import { favoriteService } from "@/features/favorite/favoriteService";
import type { FavoritePost } from "@/features/favorite/favoriteService";
import { Link } from "react-router-dom";

interface Props {
  post: FavoritePost;
  onUnliked: () => void;
}

const FavoritePostCard = ({ post, onUnliked }: Props) => {
  const handleUnlike = async () => {
    await favoriteService.unlikePost(post.id);
    onUnliked();
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 12 }}>
      <Link to={`/buy/${post.id}`}>
        <h4>{post.name}</h4>
      </Link>

      <p>{post.price?.toLocaleString()} VNĐ</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleUnlike();
        }}
      >
        Bỏ yêu thích
      </button>
    </div>
  );
};

export default FavoritePostCard;
