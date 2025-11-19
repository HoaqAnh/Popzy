import { useState } from "react";
import styles from "./Description.module.css";
import { timeSince } from "@/utils/format";

type Props = {
  text: string;
  createdAt?: string;
  views?: number;
  likes: number;
};

const Description = ({ text, createdAt, views, likes }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section>
      <h3 className={styles.sectionTitle}>Mô tả chi tiết</h3>
      <p className={styles.descContent}>
        {isExpanded ? text : `${text.slice(0, 150)}...`}
      </p>
      <button
        className={styles.readMoreBtn}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Thu gọn" : "Xem thêm"}
      </button>

      <div className={styles.postStats}>
        <span className={styles.statStrong}>
          {timeSince(createdAt || new Date().toISOString())}
        </span>
        &nbsp;|&nbsp;
        <span className={styles.statStrong}>{views || 0}</span> lượt xem
        &nbsp;|&nbsp;
        <span className={styles.statStrong}>{likes}</span> lượt thích
      </div>
    </section>
  );
};

export default Description;
