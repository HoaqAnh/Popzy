import styles from "./ListingSidebar.module.css";
import { formatPrice } from "@/utils/format";
import type { Post } from "@/types/realestate";

export const ListingSidebar = ({ post }: { post: Post }) => {
  const { marketPrice, priceHistoryPercent } = post;
  const isIncrease = priceHistoryPercent > 0;
  const priceDiff = post.price - marketPrice;
  const isOverpriced = priceDiff > 0;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <h4 className={styles.title}>Giá trị dự đoán</h4>

        {/* Giá thị trường */}
        <div className={styles.item}>
          <span className={styles.label}>Giá trị thị trường</span>
          <span className={styles.value}>{formatPrice(marketPrice)}</span>
        </div>

        {/* So sánh giá đăng */}
        <div className={styles.item}>
          <span className={styles.label}>So với giá đăng</span>
          <span
            className={`${styles.value} ${
              isOverpriced ? styles.decrease : styles.increase
            }`}
          >
            {isOverpriced ? "▲" : "▼"} {formatPrice(Math.abs(priceDiff))}
          </span>
        </div>

        {/* % Tăng trưởng */}
        <div className={styles.item}>
          <span className={styles.label}>Tăng trưởng (tháng)</span>
          <span
            className={`${styles.value} ${
              isIncrease ? styles.increase : styles.decrease
            }`}
          >
            {isIncrease ? "▲" : "▼"} {Math.abs(priceHistoryPercent)}%
          </span>
        </div>

        <p className={styles.disclaimer}>
          Dữ liệu dự đoán chỉ mang tính chất tham khảo.
        </p>
      </div>
    </aside>
  );
};
