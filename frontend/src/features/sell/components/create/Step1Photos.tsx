import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Step1Photos.module.css";
import { type PhotoItem } from "@/types/listing";
import { mockInitialPhotos } from "@/mocks/listing";

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
      <h1 className={styles.title}>Showcase Your Property with Photos</h1>
      <p className={styles.subtitle}>
        Upload at least 5 high-quality photos. The first photo will be your
        cover image. You can reorder photos by dragging them.
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <span className={styles.uploadTextStrong}>
          Drag & drop photos here or click to browse files
        </span>
        <span className={styles.uploadTextLight}>
          JPG, PNG. Max 10MB per photo.
        </span>
        <span className={styles.browseBtn}>Browse Files</span>
      </label>

      <h3 className={styles.listTitle}>Uploaded Photos ({photos.length})</h3>
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
                <span className={styles.errorText}>Upload Failed</span>
                <span className={styles.errorSub}>File is too large.</span>
                <button className={styles.retryBtn}>Try Again</button>
              </div>
            )}

            {photo.isCover && (
              <div className={styles.coverBadge}>
                <span className={styles.starIcon}>★</span> Cover
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
                <span className={styles.loadingText}>Uploading...</span>
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
