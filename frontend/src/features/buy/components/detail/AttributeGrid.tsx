import styles from "./AttributeGrid.module.css";
import { type Post } from "@/types/realestate";

const IconFloor = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 21h18M5 21V7l8-4 8 4v14" />
  </svg>
);
const IconRoad = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 20a6 6 0 0 0-12 0" />
    <line x1="12" y1="10" x2="12" y2="22" />
    <path d="M12 2v8" />
  </svg>
);
const IconDirection = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12 2 2 22 12 18 22 22 12 2" />
  </svg>
);
const IconLegal = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const AttributeGrid = ({ post }: { post: Post }) => {
  return (
    <section className={styles.attrGrid}>
      <div className={styles.attrItem}>
        <div className={styles.attrKey}>
          <span className={styles.attrIcon}>
            <IconFloor />
          </span>
          <p>Tầng</p>
        </div>
        <div className={styles.attrValue}>{post.floors || "--"} tầng</div>
      </div>
      <div className={styles.attrItem}>
        <div className={styles.attrKey}>
          <span className={styles.attrIcon}>
            <IconRoad />
          </span>
          <p>Đường vào</p>
        </div>
        <div className={styles.attrValue}>{post.access_road || "--"}m</div>
      </div>
      <div className={styles.attrItem}>
        <div className={styles.attrKey}>
          <span className={styles.attrIcon}>
            <IconDirection />
          </span>
          <p>Hướng nhà</p>
        </div>
        <div className={styles.attrValue}>
          {post.house_direction || "Đang cập nhật"}
        </div>
      </div>
      <div className={styles.attrItem}>
        <div className={styles.attrKey}>
          <span className={styles.attrIcon}>MT</span>
          <p>Mặt tiền</p>
        </div>
        <div className={styles.attrValue}>
          {post.frontage ? `${post.frontage}m` : "--"}
        </div>
      </div>
      <div className={styles.attrItem}>
        <div className={styles.attrKey}>
          <span className={styles.attrIcon}>BC</span>
          <p>Hướng ban công</p>
        </div>
        <div className={styles.attrValue}>{post.balcony_direction || "--"}</div>
      </div>
      <div className={styles.attrItem}>
        <div className={styles.attrKey}>
          <span className={styles.attrIcon}>
            <IconLegal />
          </span>
          <p>Pháp lý</p>
        </div>
        <div className={styles.attrValue}>
          {post.legal_status || "Đang cập nhật"}
        </div>
      </div>
    </section>
  );
};

export default AttributeGrid;
