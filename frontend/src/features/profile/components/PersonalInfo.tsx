import { useForm } from "react-hook-form";
import styles from "./PersonalInfo.module.css";
import { users } from "@/mocks/users";
import type { User } from "@/types/realestate";

const defaultValues = users.find((user) => user.id === "u1");

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const PersonalInfo = () => {
  const { register } = useForm<User>({ defaultValues });

  return (
    <section className={styles.section}>
      <div className={styles.layoutGrid}>
        <div className={styles.infoColumn}>
          <h2>Personal Information</h2>
          <p>Update your photo and personal details here.</p>
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
              <label className={styles.label}>Name</label>
              <input {...register("fullname")} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input {...register("email")} className={styles.input} readOnly />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input {...register("phone")} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Age</label>
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
