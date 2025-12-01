import { PersonalInfo, Security } from "@/features/profile";
import styles from "./settings.module.css";

const ProfileSettingsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Profile Settings</h1>
          <p className={styles.pageDesc}>
            Manage your personal information and security settings.
          </p>
        </header>

        <main>
          <PersonalInfo />
          <Security />
        </main>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
