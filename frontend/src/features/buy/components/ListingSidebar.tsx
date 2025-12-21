import styles from "./ListingSidebar.module.css";
import { formatPrice } from "@/utils/format";
import type { Post } from "@/types/realestate";
import { usePredictPrice } from "../hooks/usePredictPrice";

export const ListingSidebar = ({ post }: { post: Post }) => {
  const { predictedPrice, isLoading, error } = usePredictPrice(post.id);
  const targetPrice = predictedPrice || 0;
  const priceDiff = post.price - targetPrice;
  const isOverpriced = priceDiff > 0;
  const diffPercent = targetPrice > 0 ? (Math.abs(priceDiff) / targetPrice) * 100 : 0;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <h4 className={styles.title}>{post.title}</h4>

        <div className={styles.item}>
          <span className={styles.label}>Giá tin đăng</span>
          <span className={styles.value} style={{ fontWeight: 600 }}>
            {formatPrice(post.price)}
          </span>
        </div>

        <div className={styles.item}>
          <span className={styles.label}>Giá trị dự báo</span>
          <span className={`${styles.value} ${isOverpriced ? styles.decrease : styles.increase}`}>
            {isLoading ? (
              <span style={{ fontSize: "0.9em", color: "#666", fontWeight: 400 }}>
                Đang phân tích...
              </span>
            ) : error || !predictedPrice ? (
              <span style={{ fontSize: "0.9em", color: "#666" }}>--</span>
            ) : (
              formatPrice(predictedPrice)
            )}
          </span>
        </div>

        {!isLoading && predictedPrice && (
          <div className={styles.item}>
            <span className={styles.label}>Chênh lệch ({formatPrice(Math.abs(priceDiff))})</span>
            <span
              className={isOverpriced ? styles.decrease : styles.increase}
              style={{ fontWeight: 500 }}
            >
              {isOverpriced ? "▲ " : "▼ "}
              {diffPercent.toFixed(1)}%
            </span>
          </div>
        )}

        <p className={styles.disclaimer}>Dữ liệu dự báo chỉ mang tính chất tham khảo.</p>
      </div>
    </aside>
  );
};
