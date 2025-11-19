import { getAvatarLabel } from "@/utils/format";
import type { User } from "@/types/realestate";
import styles from "./SellerCard.module.css";

const SellerCard = ({ user }: { user: User }) => {
  return (
    <div className={styles.sellerCard}>
      <div className={styles.sellerHeader}>
        <div className={styles.sellerAvatar}>{getAvatarLabel(user.name)}</div>
        <div>
          <div className={styles.sellerName}>{user.name}</div>
          <div className={styles.sellerRole}>Môi giới uy tín</div>
        </div>
      </div>

      <div className={styles.contactBtns}>
        <button className={`${styles.contactBtn} ${styles.primary}`}>
          Liên hệ ngay
        </button>
        <button className={styles.contactBtn}>Nhắn Zalo</button>
      </div>
    </div>
  );
};

export default SellerCard;
