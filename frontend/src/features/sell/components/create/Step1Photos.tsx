import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Step1Photos.module.css";
import { type PhotoItem } from "@/types/listing";
import { mockInitialPhotos } from "@/mocks/listing";
import { UploadIcon } from "@/components/common/icon";

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const Step1Photos = () => {
  const { setValue, getValues, trigger } = useFormContext();

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const existing = getValues("images");
    return existing && existing.length > 0 ? existing : mockInitialPhotos;
  });

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setValue("images", photos);
    if (photos.length > 0) {
      trigger("images");
    }
  }, [photos, setValue, trigger]);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo.file && photo.url.startsWith("blob:")) {
          URL.revokeObjectURL(photo.url);
        }
      });
    };
  }, []);

  const isDuplicateFile = (file: File, currentPhotos: PhotoItem[]) => {
    return currentPhotos.some(
      (photo) =>
        photo.file &&
        photo.file.name === file.name &&
        photo.file.size === file.size &&
        photo.file.lastModified === file.lastModified
    );
  };

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_SIZE_BYTES) return false;
    if (!file.type.startsWith("image/")) return false;
    return true;
  };

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);

    const uniqueFiles = fileArray.filter(
      (file) => !isDuplicateFile(file, photos)
    );

    if (uniqueFiles.length < fileArray.length) {
      console.log("Đã bỏ qua một số file trùng lặp.");
    }

    if (uniqueFiles.length === 0) return;

    const newPhotos: PhotoItem[] = uniqueFiles.map((file) => {
      const isValid = validateFile(file);
      return {
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        status: isValid ? "success" : "error",
        file: file,
        isCover: false,
      };
    });

    setPhotos((prev) => {
      const combined = [...prev, ...newPhotos];
      const hasCover = combined.some((p) => p.isCover);
      if (!hasCover && combined.length > 0) {
        const firstValid = combined.find((p) => p.status === "success");
        if (firstValid) firstValid.isCover = true;
      }
      return combined;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const removePhoto = (id: string, url: string) => {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
    setPhotos((prev) => {
      const newList = prev.filter((p) => p.id !== id);
      const wasCover = prev.find((p) => p.id === id)?.isCover;
      if (wasCover && newList.length > 0) {
        const firstValid = newList.find((p) => p.status === "success");
        if (firstValid) firstValid.isCover = true;
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
        Tải lên ít nhất 5 ảnh chất lượng cao. Ảnh đầu tiên sẽ là ảnh bìa.
      </p>

      <label
        className={`${styles.uploadBox} ${isDragging ? styles.activeDrop : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className={styles.hiddenInput}
          onChange={handleInputChange}
        />
        <div className={styles.uploadIcon}>
          <UploadIcon />
        </div>
        <span className={styles.uploadTextStrong}>
          {isDragging
            ? "Thả ảnh vào đây ngay!"
            : "Kéo và thả ảnh vào đây hoặc nhấp để duyệt các tệp"}
        </span>
        <span className={styles.uploadTextLight}>
          JPG, PNG. Tối đa {MAX_SIZE_MB}MB cho mỗi bức ảnh.
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
                <span className={styles.errorText}>Tải lên thất bại</span>
                <span className={styles.errorSub}>File quá lớn</span>
                <button
                  className={styles.retryBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(photo.id, photo.url);
                  }}
                >
                  Xóa
                </button>
              </div>
            )}

            {photo.isCover && photo.status === "success" && (
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
                removePhoto(photo.id, photo.url);
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
