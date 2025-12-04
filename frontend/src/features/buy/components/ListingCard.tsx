import styles from "./ListingCard.module.css";
import type { Post, User } from "@/types/realestate";
import { formatPrice } from "@/utils/format";
import { ListingSidebar } from "./ListingSidebar";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ post, user }: { post: Post; user: User }) => {
  const img = post.images[0] ?? "https://picsum.photos/seed/house/600/400";
  const navigator = useNavigate();
  return (
    <div className={styles.cardWrapper}>
      <article className={styles.card} role="article" onClick={() => navigator(`${post.id}`)}>
        <div className={styles.thumb}>
          <img src={img} alt={post.title} loading="lazy" />
          <div className={styles.photoCount}>{post.images.length}</div>
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.meta}>
            <span className={styles.price}>{formatPrice(post.price)}</span>
            <span className={styles.dot} />
            <span>{post.areaM2} m²</span>
            <span className={styles.dot} />
            <span>{post.beds} Phòng ngủ</span>
            <span className={styles.dot} />
            <span>{post.baths} Phòng tắm</span>
          </div>
          <div className={styles.addr}>
            {post.address.district}, {post.address.city}
          </div>
          <p className={styles.desc}>{post.description}</p>

          <div className={styles.footer}>
            <div className={styles.user}>
              <img
                src={
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200"
                }
                alt="Avatar"
                className={styles.avatar}
              />
              <span className={styles.name}>{user.fullname}</span>
            </div>

            <div className={styles.footerRight}>
              <button className={styles.footerBtn}>Liên hệ</button>
              <button className={styles.footerBtn} onClick={() => navigator(`${post.id}`)}>
                Xem thêm
              </button>
              <button className={styles.like} title="Yêu thích">
                ❤️
                {new Intl.NumberFormat("vi-VN", {
                  notation: "compact",
                }).format(post.likes)}
              </button>
            </div>
          </div>
        </div>
      </article>

      <ListingSidebar post={post} />
    </div>
  );
};

export default ListingCard;
