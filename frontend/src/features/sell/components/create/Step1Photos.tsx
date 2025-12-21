import styles from "./Step1Photos.module.css";
import { UploadIcon } from "@/components/common/icon";
import { usePhotoManager } from "../../hooks/usePhotoManager";

const Step1Photos = () => {
  const { photos, errorMap, isDragging, progress, MAX_SIZE_MB, MAX_SIZE_BYTES, actions } =
    usePhotoManager();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trực quan bất động sản của bạn bằng hình ảnh</h1>
      <p className={styles.subtitle}>
        Tải lên ít nhất 5 ảnh chất lượng cao. Ảnh đầu tiên sẽ là ảnh bìa.
      </p>

      <label
        className={`${styles.uploadBox} ${isDragging ? styles.activeDrop : ""}`}
        onDragEnter={actions.handleDragEnter}
        onDragLeave={actions.handleDragLeave}
        onDragOver={actions.handleDragOver}
        onDrop={actions.handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp"
          className={styles.hiddenInput}
          onChange={actions.handleInputChange}
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
            className={`${styles.photoCard} ${photo.status === "error" ? styles.errorCard : ""}`}
            onClick={() => photo.status === "success" && actions.setCover(photo.id)}
          >
            {photo.status !== "error" && (
              <img src={photo.url} alt="property" className={styles.img} />
            )}

            {photo.status === "error" && (
              <div className={styles.errorPlaceholder}>
                <div className={styles.errorIcon}>!</div>
                <span className={styles.errorText}>{errorMap[photo.id] || "Tải lên thất bại"}</span>
                <span className={styles.errorSub}>Kiểm tra lại ảnh</span>
                <button
                  className={styles.retryBtn}
                  onClick={(e) => {
                    if (photo.file && photo.file.size > MAX_SIZE_BYTES) {
                      e.stopPropagation();
                      actions.removePhoto(photo.id, photo.url);
                    } else {
                      actions.handleRetry(e, photo);
                    }
                  }}
                >
                  {photo.file && photo.file.size > MAX_SIZE_BYTES ? "Xóa" : "Thử lại"}
                </button>
              </div>
            )}

            {photo.isCover && (photo.status === "success" || photo.status === "uploading") && (
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
                      width: `${progress > 0 ? progress : 10}%`,
                      transition: "width 0.2s ease",
                    }}
                  />
                </div>
                <span className={styles.loadingText}>
                  {progress === 0 ? "Checking AI..." : `${progress}%`}
                </span>
              </div>
            )}

            <button
              className={styles.deleteBtn}
              onClick={(e) => {
                e.stopPropagation();
                actions.removePhoto(photo.id, photo.url);
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
