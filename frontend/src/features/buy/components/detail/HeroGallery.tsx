import { useState } from "react";
import styles from "./HeroGallery.module.css";

type HeroGalleryProps = {
  images: string[];
};

const HeroGallery = ({ images }: HeroGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const previewImages = images.slice(0, 3);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.mobileScroll}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Preview ${idx}`}
              onClick={openModal}
            />
          ))}
        </div>

        <div className={styles.desktopGrid}>
          {previewImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Hero ${idx}`}
              className={styles.desktopImg}
              onClick={openModal}
            />
          ))}
        </div>

        <button className={styles.btnShowAll} onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          Xem tất cả {images.length} ảnh
        </button>
      </div>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalHeader}>
            <button
              onClick={closeModal}
              style={{
                border: "none",
                background: "transparent",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              &lt; Quay lại
            </button>
            <span style={{ fontWeight: 700 }}>Tất cả ảnh</span>
          </div>

          <div className={styles.modalGrid}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Gallery ${idx}`}
                className={styles.modalImg}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HeroGallery;
