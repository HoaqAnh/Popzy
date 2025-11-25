import { useFormContext } from "react-hook-form";
import styles from "./Step6Review.module.css";
import { type CreateListingFormValues } from "@/types/listing";
import { cities, districts } from "@/mocks/locations";
import { formatPrice } from "@/utils/format";

const Step6Review = () => {
  const { getValues } = useFormContext<CreateListingFormValues>();
  const values = getValues();

  const cityName =
    cities.find((c) => c.code === values.city)?.name || values.city;
  const districtList = values.city ? districts[values.city] : [];
  const districtName =
    districtList?.find((d) => d.code === values.district)?.name ||
    values.district;

  const coverPhoto =
    values.images.find((img) => img.isCover)?.url ||
    values.images[0]?.url ||
    "";
  const otherPhotos = values.images.filter((img) => img.url !== coverPhoto);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Xem lại bản tin của bạn</h1>
        <p className={styles.subtitle}>
          Hãy đảm bảo mọi thứ trông hoàn hảo trước khi xuất bản.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.imagePreview}>
          <div className={styles.coverWrapper}>
            {coverPhoto ? (
              <img src={coverPhoto} alt="Cover" className={styles.coverImg} />
            ) : (
              <div className={styles.noImage}>
                Không có hình ảnh nào được tải lên
              </div>
            )}
            <span className={styles.coverBadge}>Ảnh bìa</span>
          </div>

          {otherPhotos.length > 0 && (
            <div className={styles.thumbGrid}>
              {otherPhotos.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt="Thumbnail"
                  className={styles.thumbImg}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.listingTitle}>{values.title}</h2>
            <p className={styles.listingAddress}>
              {districtName}, {cityName}
            </p>
          </div>
          <div className={styles.priceTag}>{formatPrice(values.price)}</div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.gridInfo}>
          <InfoItem label="Diện tích" value={`${values.area} m²`} />
          <InfoItem label="Phòng ngủ" value={values.bedrooms} />
          <InfoItem label="Phòng tắm" value={values.bathrooms} />
          <InfoItem
            label="Tầng"
            value={values.floors ? `${values.floors} tầng` : "--"}
          />
          <InfoItem
            label="Mặt tiền"
            value={values.frontage ? `${values.frontage}m` : "--"}
          />
          <InfoItem
            label="Đường vào"
            value={values.accessRoad ? `${values.accessRoad}m` : "--"}
          />
          <InfoItem label="Hướng nhà" value={values.houseDirection || "--"} />
          <InfoItem
            label="Hướng ban công"
            value={values.balconyDirection || "--"}
          />
          <InfoItem label="Pháp lý" value={values.legalStatus || "--"} />
          <InfoItem label="Nội thất" value={values.furniture || "--"} />
        </div>
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Mô tả chi tiết</h3>
        <p className={styles.descriptionText}>
          {values.description || "Không có mô tả nào được cung cấp."}
        </p>
      </div>
    </div>
  );
};

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className={styles.infoItem}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
);

export default Step6Review;
