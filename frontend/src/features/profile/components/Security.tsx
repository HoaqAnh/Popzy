import { useForm } from "react-hook-form";
import styles from "./Security.module.css";

const Security = () => {
  const { register } = useForm();

  return (
    <section className={styles.section}>
      <div className={styles.layoutGrid}>
        <div className={styles.infoColumn}>
          <h2>Password</h2>
          <p>Change your password here. Make sure it's a strong one.</p>
        </div>

        <div className={styles.formColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Password</label>
            <input
              type="password"
              {...register("currentPassword")}
              className={styles.input}
              placeholder="Enter current password"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <input
              type="password"
              {...register("newPassword")}
              className={styles.input}
              placeholder="Enter new password"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm New Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={styles.input}
              placeholder="Confirm new password"
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.saveBtn}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
