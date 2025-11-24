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
        <h1 className={styles.title}>Review Your Listing</h1>
        <p className={styles.subtitle}>
          Make sure everything looks perfect before publishing.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Images</h3>
        <div className={styles.imagePreview}>
          <div className={styles.coverWrapper}>
            {coverPhoto ? (
              <img src={coverPhoto} alt="Cover" className={styles.coverImg} />
            ) : (
              <div className={styles.noImage}>No images uploaded</div>
            )}
            <span className={styles.coverBadge}>Cover Image</span>
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

      <div className={styles.infoCard}>
        <div className={styles.cardHeader}>
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
          <InfoItem label="Area" value={`${values.area} m²`} />
          <InfoItem label="Bedrooms" value={values.bedrooms} />
          <InfoItem label="Bathrooms" value={values.bathrooms} />
          <InfoItem
            label="Floors"
            value={values.floors ? `${values.floors} tầng` : "--"}
          />
        </div>
      </div>

      <div className={styles.infoCard}>
        <h3 className={styles.cardTitle}>Property Details</h3>
        <div className={styles.gridDetails}>
          <InfoItem
            label="Frontage"
            value={values.frontage ? `${values.frontage}m` : "--"}
          />
          <InfoItem
            label="Access Road"
            value={values.accessRoad ? `${values.accessRoad}m` : "--"}
          />
          <InfoItem label="Direction" value={values.houseDirection || "--"} />
          <InfoItem label="Balcony" value={values.balconyDirection || "--"} />
          <InfoItem label="Legal" value={values.legalStatus || "--"} />
          <InfoItem label="Furniture" value={values.furniture || "--"} />
        </div>

        <hr className={styles.divider} />

        <h3 className={styles.cardTitle}>Description</h3>
        <p className={styles.descriptionText}>
          {values.description || "No description provided."}
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
