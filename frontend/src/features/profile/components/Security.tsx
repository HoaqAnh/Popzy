import { useFormContext } from "react-hook-form";
import styles from "./Security.module.css";

const Security = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const newPassword = watch("newPassword");

  return (
    <section className={styles.section}>
      <div className={styles.layoutGrid}>
        <div className={styles.infoColumn}>
          <h2>Mật khẩu</h2>
          <p>Nhập mật khẩu mới nếu bạn muốn thay đổi.</p>
        </div>

        <div className={styles.formColumn}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Mật khẩu mới</label>
            <input
              type="password"
              {...register("newPassword", {
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
              className={styles.input}
              placeholder="Nhập mật khẩu mới"
            />
            {errors.newPassword && (
              <p style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                {errors.newPassword.message as string}
              </p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Xác nhận mật khẩu mới</label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) => {
                  if (!newPassword) return true;
                  return value === newPassword || "Mật khẩu xác nhận không khớp";
                },
              })}
              className={styles.input}
              placeholder="Xác nhận mật khẩu mới"
            />
            {errors.confirmPassword && (
              <p style={{ color: "red", fontSize: "13px", marginTop: "4px" }}>
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
