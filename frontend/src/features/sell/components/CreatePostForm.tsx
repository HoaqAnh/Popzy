import { useState } from "react";
import styles from "./CreatePostForm.module.css";

export const CreatePostForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Chức năng đang được phát triển!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  return (
    <section className={styles.formSection}>
      <h1 className={styles.title}>Tạo bài đăng mới</h1>

      <div className={styles.formCard}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Tiêu đề */}
          <div className={styles.formGroup}>
            <label htmlFor="title">Tiêu đề</label>
            <input
              id="title"
              type="text"
              placeholder="VD: Bán nhà mặt phố..."
              required
            />
          </div>

          {/* Mô tả */}
          <div className={styles.formGroup}>
            <label htmlFor="description">Mô tả chi tiết</label>
            <textarea
              id="description"
              placeholder="Mô tả chi tiết về bất động sản..."
              required
            />
          </div>

          {/* Giá và Diện tích */}
          <div className={styles.gridPair}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Giá (VND)</label>
              <input
                id="price"
                type="number"
                min={0}
                placeholder="VD: 2950000000"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="area">Diện tích (m²)</label>
              <input
                id="area"
                type="number"
                min={0}
                placeholder="VD: 95"
                required
              />
            </div>
          </div>

          {/* Địa chỉ */}
          <div className={styles.gridPair}>
            <div className={styles.formGroup}>
              <label htmlFor="city">Thành phố</label>
              <input id="city" type="text" placeholder="VD: Hà Nội" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="district">Quận/Huyện</label>
              <input
                id="district"
                type="text"
                placeholder="VD: Cầu Giấy"
                required
              />
            </div>
          </div>

          {/* Phòng ngủ và Phòng tắm */}
          <div className={styles.gridPair}>
            <div className={styles.formGroup}>
              <label htmlFor="beds">Số phòng ngủ</label>
              <input
                id="beds"
                type="number"
                min={0}
                placeholder="VD: 3"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="baths">Số phòng tắm</label>
              <input
                id="baths"
                type="number"
                min={0}
                placeholder="VD: 2"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Hình ảnh</label>
            <label htmlFor="images" className={styles.fileUploadLabel}>
              Nhấn để chọn hoặc kéo thả tệp
            </label>
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            {selectedFiles.length > 0 && (
              <div className={styles.filePreview}>
                <strong>Đã chọn:</strong>
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Nút Submit */}
          <button type="submit" className={styles.submitBtn}>
            Đăng tin
          </button>
        </form>
      </div>
    </section>
  );
};
