import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styles from "./PersonalInfo.module.css";
import type { User } from "@/types/realestate";
import { EditIcon } from "@/components/common/icon";
import { useGetProfile } from "../hooks/useGetProfile";
import { useImageUpload } from "@/features/sell/hooks/useImageUpload";
import { getAvatarLabel } from "@/utils/format";
import { getCloudinaryUrl } from "@/utils/image";
import { Quantum } from "@/components/common/loader";

const PersonalInfo = () => {
  const { user, isLoading, error } = useGetProfile();
  const { uploadImages, isUploading } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register, reset, setValue, watch } = useForm<User>({
    defaultValues: user || {},
  });

  const watchedImageUrl = watch("imageUrl");

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileToUpload = files[0];
      const result = await uploadImages([fileToUpload]);

      if (result.success && result.data && result.data.length > 0) {
        const newImagePublicId = result.data[0].url;
        setValue("imageUrl", newImagePublicId, { shouldDirty: true });
      } else {
        alert("Upload ảnh thất bại: " + result.error);
      }
    }
    e.target.value = "";
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div
        className={styles.section}
        style={{ textAlign: "center", color: "var(--muted-foreground)" }}
      >
        Đang tải thông tin...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section} style={{ color: "var(--destructive)", textAlign: "center" }}>
        Lỗi: {error}
      </div>
    );
  }

  const currentImageSource = watchedImageUrl || user?.imageUrl;
  const hasImage = !!currentImageSource;

  return (
    <section className={styles.section}>
      <div className={styles.layoutGrid}>
        <div className={styles.infoColumn}>
          <h2>Thông tin cá nhân</h2>
          <p>Cập nhật ảnh và thông tin cá nhân của bạn tại đây.</p>
        </div>

        <div className={styles.formColumn}>
          <div className={styles.avatarRow}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg, image/webp"
            />

            <div className={styles.avatarWrapper}>
              {isUploading ? (
                <div className={`${styles.avatar} ${styles.avatarPlaceholder}`}>
                  <Quantum />
                </div>
              ) : hasImage ? (
                <img
                  src={getCloudinaryUrl(currentImageSource)}
                  alt="Profile"
                  className={styles.avatar}
                />
              ) : (
                <div className={`${styles.avatar} ${styles.avatarPlaceholder}`}>
                  {getAvatarLabel(user?.fullname || "")}
                </div>
              )}

              <button
                className={styles.editAvatarBtn}
                type="button"
                onClick={handleTriggerUpload}
                disabled={isUploading}
                title="Đổi ảnh đại diện"
              >
                <EditIcon />
              </button>
            </div>

            <div className={styles.userMeta}>
              <h3>{user?.fullname}</h3>
              <span>{user?.email}</span>
            </div>
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Họ tên</label>
              <input
                {...register("fullname")}
                className={styles.input}
                placeholder="Chưa cập nhật"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input {...register("email")} className={styles.input} readOnly disabled />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Số điện thoại</label>
              <input {...register("phone")} className={styles.input} placeholder="Chưa cập nhật" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tuổi</label>
              <input
                {...register("age", { valueAsNumber: true })}
                type="number"
                className={styles.input}
                placeholder="--"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
