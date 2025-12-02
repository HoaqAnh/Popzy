import { PersonalInfo, Security } from "@/features/profile";
import styles from "./settings.module.css";

const ProfileSettingsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.main}>
        <PersonalInfo />
        <Security />
        <div className={styles.actions}>
          <button type="button" className={styles.saveBtn}>
            Lưu thay đổi
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettingsPage;
