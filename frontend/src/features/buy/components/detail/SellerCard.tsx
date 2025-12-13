import { getAvatarLabel } from "@/utils/format";
import type { User } from "@/types/realestate";
import styles from "./SellerCard.module.css";
import { ContactIcon, LikeIcon } from "@/components/common/icon";

const SellerCard = ({ user }: { user: User }) => {
  return (
    <div className={styles.sellerCard}>
      <div className={styles.sellerHeader}>
        {(user.imageUrl && <img src={user.imageUrl} alt="Avatar" className={styles.avatar} />) || (
          <div className={styles.avatar}>{getAvatarLabel(user.fullname)}</div>
        )}
        <div>
          <div className={styles.sellerName}>{user.fullname}</div>
          <div className={styles.sellerRole}>Môi giới uy tín</div>
        </div>
      </div>

      <div className={styles.contactBtns}>
        <button className={`${styles.contactBtn} ${styles.primary}`}>
          <ContactIcon />
          <p>Liên hệ ngay</p>
        </button>
        <button className={styles.contactBtn}>
          <LikeIcon />
          <p>Yêu thích bản tin này</p>
        </button>
      </div>
    </div>
  );
};

export default SellerCard;
