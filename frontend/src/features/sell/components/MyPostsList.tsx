import styles from "./MyPostsList.module.css";
import { myPosts } from "@/mocks/myPosts";
import { formatPrice } from "@/utils/format";

const MyPostsList = () => {
  return (
    <section className={styles.listSection}>
      <h1 className={styles.title}>Bài đăng của tôi</h1>

      {myPosts.length > 0 ? (
        <div className={styles.postList}>
          {myPosts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <img
                src={post.images[0] ?? "https://via.placeholder.com/100"}
                alt={post.title}
                className={styles.postImage}
                loading="lazy"
              />
              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <div className={styles.postMeta}>
                  <span>{formatPrice(post.price)}</span> •{" "}
                  <span>{post.areaM2} m²</span>
                </div>
                <div className={styles.postActions}>
                  <button className={styles.actionBtn}>Sửa</button>
                  <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                    Xóa
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>Bạn chưa có bài đăng nào.</p>
      )}
    </section>
  );
};

export default MyPostsList;
