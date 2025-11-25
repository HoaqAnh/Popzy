import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Step1Photos.module.css";
import { type PhotoItem } from "@/types/listing";
import { mockInitialPhotos } from "@/mocks/listing";
import { UploadIcon } from "@/components/common/icon";

const Step1Photos = () => {
  const { setValue, getValues } = useFormContext();

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const existing = getValues("images");
    return existing && existing.length > 0 ? existing : mockInitialPhotos;
  });

  useEffect(() => {
    setValue("images", photos);
  }, [photos, setValue]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: URL.createObjectURL(file),
        url: URL.createObjectURL(file),
        status: "success" as const,
        file: file,
        isCover: photos.length === 0,
      }));

      setPhotos((prev) => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const newList = prev.filter((p) => p.id !== id);
      if (prev.find((p) => p.id === id)?.isCover && newList.length > 0) {
        newList[0].isCover = true;
      }
      return newList;
    });
  };

  const setCover = (id: string) => {
    setPhotos((prev) =>
      prev.map((p) => ({
        ...p,
        isCover: p.id === id,
      }))
    );
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Trực quan bất động sản của bạn bằng hình ảnh
      </h1>
      <p className={styles.subtitle}>
        Tải lên ít nhất 5 ảnh chất lượng cao. Ảnh đầu tiên sẽ là ảnh bìa. Bạn có
        thể sắp xếp lại ảnh bằng cách kéo chúng.
      </p>

      <label className={styles.uploadBox}>
        <input
          type="file"
          multiple
          accept="image/*"
          className={styles.hiddenInput}
          onChange={handleFiles}
        />
        <div className={styles.uploadIcon}>
          <UploadIcon />
        </div>
        <span className={styles.uploadTextStrong}>
          Kéo và thả ảnh vào đây hoặc nhấp để duyệt các tệp
        </span>
        <span className={styles.uploadTextLight}>
          JPG, PNG. Tối đa 10MB cho mỗi bức ảnh.
        </span>
        <span className={styles.browseBtn}>Browse Files</span>
      </label>

      <h3 className={styles.listTitle}>Ảnh đã tải lên ({photos.length})</h3>
      <div className={styles.photoGrid}>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`${styles.photoCard} ${
              photo.status === "error" ? styles.errorCard : ""
            }`}
            onClick={() => photo.status === "success" && setCover(photo.id)}
          >
            {photo.status !== "error" ? (
              <img src={photo.url} alt="property" className={styles.img} />
            ) : (
              <div className={styles.errorPlaceholder}>
                <div className={styles.errorIcon}>!</div>
                <span className={styles.errorText}>
                  Tải lên không thành công
                </span>
                <span className={styles.errorSub}>Tệp quá lớn.</span>
                <button className={styles.retryBtn}>Thử lại</button>
              </div>
            )}

            {photo.isCover && (
              <div className={styles.coverBadge}>
                <span className={styles.starIcon}>★</span> Ảnh bìa
              </div>
            )}

            {photo.status === "uploading" && (
              <div className={styles.loadingOverlay}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: "60%" }}
                  />
                </div>
                <span className={styles.loadingText}>Đang tải lên...</span>
              </div>
            )}

            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                e.stopPropagation();
                removePhoto(photo.id);
              }}
              type="button"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1Photos;
