import { useForm } from "react-hook-form";
import styles from "./Security.module.css";

const Security = () => {
  const { register } = useForm();

  return (
    <section className={styles.section}>
      <div className={styles.layoutGrid}>
        <div className={styles.infoColumn}>
          <h2>Mật khẩu</h2>
          <p>Đổi mật khẩu của bạn tại đây. Hãy đảm bảo mật khẩu đủ mạnh.</p>
        </div>

        <div className={styles.formColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Mật khẩu hiện tại</label>
            <input
              type="password"
              {...register("currentPassword")}
              className={styles.input}
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mật khẩu mới</label>
            <input
              type="password"
              {...register("newPassword")}
              className={styles.input}
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Xác nhận mật khẩu mới</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className={styles.input}
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
