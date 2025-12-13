import { getAvatarLabel } from "@/utils/format";
import styles from "./MobileStickyActions.module.css";
import type { User } from "@/types/realestate";
import { ContactIcon, LikeIcon } from "@/components/common/icon";

const MobileStickyActions = ({ user }: { user: User }) => {
  return (
    <div className={styles.mobileActions}>
      <div className={styles.sellerInfo}>
        {(user.imageUrl && <img src={user.imageUrl} alt="Avatar" className={styles.avatar} />) || (
          <div className={styles.avatar}>{getAvatarLabel(user.fullname)}</div>
        )}
        <div>
          <p>{user.fullname}</p>
          <span>Môi giới uy tín</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.btnContact}>
          <ContactIcon />
        </button>
        <button className={styles.btnLike}>
          <LikeIcon />
        </button>
      </div>
    </div>
  );
};

export default MobileStickyActions;
