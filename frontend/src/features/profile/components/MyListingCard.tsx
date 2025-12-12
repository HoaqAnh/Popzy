import styles from "./MyListingCard.module.css";
import { type Post } from "@/types/realestate";
import { formatPrice, timeSince } from "@/utils/format";
import { EditIcon, TrashIcon } from "@/components/common/icon";

type Props = {
  post: Post;
};

const MyListingCard = ({ post }: Props) => {
  const thumb = post.images?.[0] || "https://picsum.photos/seed/realestate/200/150";

  return (
    <article className={styles.card}>
      <div className={styles.thumbWrapper}>
        <img src={thumb} alt={post.title} className={styles.thumb} loading="lazy" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.desc}>
          {post.address.district}, {post.address.city} • {post.description}
        </p>

        <div className={styles.metaRow}>
          <span className={styles.price}>{formatPrice(post.price)}</span>
          <span style={{ color: "#e5e7eb" }}>|</span>
          <span className={styles.date}>
            {timeSince(post.created_at || new Date().toISOString())}
          </span>
          {post.views !== undefined && (
            <>
              <span style={{ color: "#e5e7eb" }}>|</span>
              <span>👁 {post.views} lượt xem</span>
            </>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={`${styles.btnAction} ${styles.btnEdit}`}>
          <EditIcon /> Sửa
        </button>
        <button className={`${styles.btnAction} ${styles.btnDelete}`}>
          <TrashIcon /> Xóa
        </button>
      </div>
    </article>
  );
};

export default MyListingCard;
