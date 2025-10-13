import styles from "@/pages/buy/buy.module.css";
import type { Post, User } from "@/types/realestate";

export const ListingCard = ({ post, user }: { post: Post; user: User }) => {
  const img = post.images[0] ?? "https://picsum.photos/seed/house/600/400";
  return (
    <article className={styles.card} role="article">
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
          <span>{post.beds} PN</span>
          <span className={styles.dot} />
          <span>{post.baths} PT</span>
        </div>
        <div className={styles.addr}>
          {post.address.district}, {post.address.city}
        </div>
        <p className={styles.desc}>{post.description}</p>
        <div className={styles.footer}>
          <div className={styles.user}>
            <div className={styles.avatar} aria-hidden>
              <span>{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <span className={styles.name}>{user.name}</span>
          </div>
          <button className={styles.like} title="Yêu thích">
            ❤️ {new Intl.NumberFormat("vi-VN", { notation: "compact" }).format(post.likes)}
          </button>
        </div>
      </div>
    </article>
  );
};

function formatPrice(p: number) {
  if (p >= 1_000_000_000) return (p / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + " tỷ";
  if (p >= 1_000_000) return (p / 1_000_000).toFixed(0) + " triệu";
  return p.toLocaleString("vi-VN") + " đ";
}