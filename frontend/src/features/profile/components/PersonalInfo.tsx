import { useForm } from "react-hook-form";
import styles from "./PersonalInfo.module.css";
import { users } from "@/mocks/users";
import type { User } from "@/types/realestate";
import { EditIcon } from "@/components/common/icon";

const defaultValues = users.find((user) => user.id === "u1");

const PersonalInfo = () => {
  const { register } = useForm<User>({ defaultValues });

  return (
    <section className={styles.section}>
      <div className={styles.layoutGrid}>
        <div className={styles.infoColumn}>
          <h2>Thông tin cá nhân</h2>
          <p>Cập nhật ảnh và thông tin cá nhân của bạn tại đây.</p>
        </div>

        <div className={styles.formColumn}>
          <div className={styles.avatarRow}>
            <div className={styles.avatarWrapper}>
              <img
                src={
                  defaultValues?.imageUrl ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200"
                }
                alt="Profile"
                className={styles.avatar}
              />
              <button className={styles.editAvatarBtn} type="button">
                <EditIcon />
              </button>
            </div>
            <div className={styles.userMeta}>
              <h3>{defaultValues?.fullname}</h3>
              <span>{defaultValues?.email}</span>
            </div>
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Họ tên</label>
              <input {...register("fullname")} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input {...register("email")} className={styles.input} readOnly />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Số điện thoại</label>
              <input {...register("phone")} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tuổi</label>
              <input
                {...register("age", { valueAsNumber: true })}
                type="number"
                className={styles.input}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
