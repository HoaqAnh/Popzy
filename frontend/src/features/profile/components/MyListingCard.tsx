import { useNavigate } from "react-router-dom";
import styles from "./MyListingCard.module.css";
import { type Post } from "@/types/realestate";
import { formatPrice, timeSince } from "@/utils/format";
import { EditIcon, TrashIcon } from "@/components/common/icon";

type Props = {
  post: Post;
  onDelete: (id: number) => void;
};

const MyListingCard = ({ post, onDelete }: Props) => {
  const navigate = useNavigate();
  const thumb = post.images?.[0] || "https://picsum.photos/seed/realestate/200/150";

  const handleCardClick = () => {
    navigate(`/buy/${post.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa tin đăng này không? Hành động này không thể hoàn tác."
      )
    ) {
      onDelete(post.id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Click edit post:", post.id);
  };

  return (
    <article className={styles.card} onClick={handleCardClick}>
      <div className={styles.thumbWrapper}>
        <img src={thumb} alt={post.title} className={styles.thumb} loading="lazy" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.desc}>
          {post.address.district}, {post.address.city} • {post.description}
        </p>

        <div className={styles.metaRow}>
          <div className={styles.meta}>
            <span className={styles.price}>{formatPrice(post.price)}</span>
            <span style={{ color: "#e5e7eb" }}>|</span>
            <span className={styles.date}>
              {timeSince(post.created_at || new Date().toISOString())}
            </span>
          </div>
          <div className={styles.actions}>
            <button className={`${styles.btnAction} ${styles.btnEdit}`} onClick={handleEditClick}>
              <EditIcon />
            </button>
            <button
              className={`${styles.btnAction} ${styles.btnDelete}`}
              onClick={handleDeleteClick}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyListingCard;
