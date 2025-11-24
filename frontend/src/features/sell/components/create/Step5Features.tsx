import { useFormContext } from "react-hook-form";
import styles from "./Step5Features.module.css";
import { type CreateListingFormValues } from "@/types/listing";
import { directions, furnitureStatus, legalStatuses } from "@/mocks/listing";

const Step5Features = () => {
  const { register } = useFormContext<CreateListingFormValues>();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Optional Property Details</h1>
        <p className={styles.subtitle}>
          Enhance your listing with these additional details to attract more
          buyers.
        </p>
      </div>

      <div className={styles.formCard}>
        <div className={styles.gridRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Frontage (Số lượng mặt tiền)</label>
            <input
              type="number"
              className={styles.input}
              placeholder="e.g., 2"
              min={0}
              {...register("frontage", { valueAsNumber: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Access Road Width (Rộng đường vào)
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                className={`${styles.input} ${styles.hasSuffix}`}
                placeholder="e.g., 5"
                min={0}
                step="0.1"
                {...register("accessRoad", { valueAsNumber: true })}
              />
              <span className={styles.suffix}>m</span>
            </div>
          </div>
        </div>

        <div className={styles.gridRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Number of Floors (Số tầng)</label>
            <input
              type="number"
              className={styles.input}
              placeholder="e.g., 3"
              min={0}
              {...register("floors", { valueAsNumber: true })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Legal Status (Tình trạng pháp lý) <span title="Info"></span>
            </label>
            <div className={styles.selectWrapper}>
              <select className={styles.select} {...register("legalStatus")}>
                <option value="">Select legal status</option>
                {legalStatuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className={styles.arrow}>▼</span>
            </div>
          </div>
        </div>

        <div className={styles.gridRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>House Direction (Hướng nhà)</label>
            <div className={styles.selectWrapper}>
              <select className={styles.select} {...register("houseDirection")}>
                <option value="">Select direction</option>
                {directions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className={styles.arrow}>▼</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Balcony Direction (Hướng ban công)
            </label>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                {...register("balconyDirection")}
              >
                <option value="">Select direction</option>
                {directions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <span className={styles.arrow}>▼</span>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Furniture (Nội thất)</label>
          <div className={styles.selectWrapper}>
            <select className={styles.select} {...register("furniture")}>
              <option value="">Select furniture status</option>
              {furnitureStatus.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span className={styles.arrow}>▼</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Features;
