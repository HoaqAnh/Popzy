import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Step1Photos.module.css";
import { type PhotoItem } from "@/types/listing";
import { UploadIcon } from "@/components/common/icon";
import { getCloudinaryUrl } from "@/utils/image";
import { useImageUpload } from "../../hooks/useImageUpload";

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const Step1Photos = () => {
  const { setValue, getValues, trigger } = useFormContext();
  const { uploadImages, progress } = useImageUpload();

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const existing = getValues("images");
    return existing && existing.length > 0 ? existing : [];
  });

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setValue("images", photos);
    const isUploading = photos.some((p) => p.status === "uploading");
    if (photos.length > 0 && !isUploading) {
      trigger("images");
    }
  }, [photos, setValue, trigger]);

  useEffect(() => {
    return () => {
      photos.forEach((photo) => {
        if (photo.url.startsWith("blob:")) {
          URL.revokeObjectURL(photo.url);
        }
      });
    };
  }, []);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_SIZE_BYTES) return false;
    if (!file.type.startsWith("image/")) return false;
    return true;
  };

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const fileArray = Array.from(fileList);
    const uniqueFiles = fileArray.filter((file) => {
      return !photos.some(
        (p) => p.file && p.file.name === file.name && p.file.size === file.size
      );
    });

    if (uniqueFiles.length === 0) return;

    const validItems: PhotoItem[] = [];
    const invalidItems: PhotoItem[] = [];
    const filesToUpload: File[] = [];

    uniqueFiles.forEach((file) => {
      const newItem: PhotoItem = {
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        status: validateFile(file) ? "uploading" : "error",
        file: file,
        isCover: false,
      };

      if (validateFile(file)) {
        validItems.push(newItem);
        filesToUpload.push(file);
      } else {
        invalidItems.push(newItem);
      }
    });

    setPhotos((prev) => {
      const combined = [...prev, ...validItems, ...invalidItems];
      const hasCover = combined.some((p) => p.isCover);
      if (!hasCover && combined.length > 0) {
        const firstValid = combined.find((p) => p.status !== "error");
        if (firstValid) firstValid.isCover = true;
      }
      return combined;
    });

    if (filesToUpload.length > 0) {
      const result = await uploadImages(filesToUpload);

      if (result.success && result.data) {
        const serverResults = result.data;

        setPhotos((prev) => {
          return prev.map((p) => {
            const indexInBatch = validItems.findIndex(
              (item) => item.id === p.id
            );

            if (indexInBatch !== -1 && serverResults[indexInBatch]) {
              const resItem = serverResults[indexInBatch];
              const finalUrl = getCloudinaryUrl(resItem.url);

              return {
                ...p,
                status: "success",
                url: finalUrl,
                publicId: resItem.url,
              };
            }
            return p;
          });
        });
      } else {
        setPhotos((prev) =>
          prev.map((p) => {
            const isItemInBatch = validItems.some((item) => item.id === p.id);
            return isItemInBatch ? { ...p, status: "error" } : p;
          })
        );
      }
    }
  };

  const removePhoto = (id: string, url: string) => {
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
    setPhotos((prev) => {
      const newList = prev.filter((p) => p.id !== id);
      const wasCover = prev.find((p) => p.id === id)?.isCover;
      if (wasCover && newList.length > 0) {
        const firstValid = newList.find(
          (p) => p.status === "success" || p.status === "uploading"
        );
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

  const handleRetry = async (e: React.MouseEvent, photo: PhotoItem) => {
    e.stopPropagation();
    if (!photo.file) return;
    if (!validateFile(photo.file)) return;

    setPhotos((prev) =>
      prev.map((p) => (p.id === photo.id ? { ...p, status: "uploading" } : p))
    );

    const result = await uploadImages([photo.file]);

    if (result.success && result.data && result.data[0]) {
      const resItem = result.data[0];
      const finalUrl = getCloudinaryUrl(resItem.url) || resItem.url;

      setPhotos((prev) =>
        prev.map((p) =>
          p.id === photo.id
            ? {
                ...p,
                status: "success",
                url: finalUrl,
                publicId: resItem.url,
              }
            : p
        )
      );
    } else {
      setPhotos((prev) =>
        prev.map((p) => (p.id === photo.id ? { ...p, status: "error" } : p))
      );
    }
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
            {photo.status !== "error" && (
              <img src={photo.url} alt="property" className={styles.img} />
            )}

            {photo.status === "error" && (
              <div className={styles.errorPlaceholder}>
                <div className={styles.errorIcon}>!</div>
                <span className={styles.errorText}>Tải lên thất bại</span>
                <span className={styles.errorSub}>
                  {photo.file && photo.file.size > MAX_SIZE_BYTES
                    ? "File quá lớn"
                    : "Lỗi mạng"}
                </span>
                <button
                  className={styles.retryBtn}
                  onClick={(e) => {
                    if (photo.file && photo.file.size > MAX_SIZE_BYTES) {
                      e.stopPropagation();
                      removePhoto(photo.id, photo.url);
                    } else {
                      handleRetry(e, photo);
                    }
                  }}
                >
                  {photo.file && photo.file.size > MAX_SIZE_BYTES
                    ? "Xóa"
                    : "Thử lại"}
                </button>
              </div>
            )}

            {photo.isCover &&
              (photo.status === "success" || photo.status === "uploading") && (
                <div className={styles.coverBadge}>
                  <span className={styles.starIcon}>★</span> Ảnh bìa
                </div>
              )}

            {photo.status === "uploading" && (
              <div className={styles.loadingOverlay}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${progress}%`,
                      transition: "width 0.2s ease",
                    }}
                  />
                </div>
                <span className={styles.loadingText}>{progress}%</span>
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
