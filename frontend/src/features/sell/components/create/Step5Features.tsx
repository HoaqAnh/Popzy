import { useFormContext } from "react-hook-form";
import styles from "./Step5Features.module.css";
import { type CreateListingFormValues } from "@/types/listing";
import { directions, furnitureStatus, legalStatuses } from "@/mocks/listing";

const Step5Features = () => {
  const { register } = useFormContext<CreateListingFormValues>();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        Thông tin chi tiết bất động sản (tùy chọn)
      </h1>
      <p className={styles.subtitle}>
        Nâng cao sự tiếp cận bản tin của bạn bằng những thông tin bổ sung này để
        thu hút thêm người mua.
      </p>

      <div className={styles.gridRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Mặt tiền</label>
          <input
            type="number"
            className={styles.input}
            placeholder="Số lượng"
            min={0}
            {...register("frontage", { valueAsNumber: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Độ rộng đường vào</label>
          <div className={styles.inputWrapper}>
            <input
              type="number"
              className={`${styles.input} ${styles.hasSuffix}`}
              placeholder="Mét"
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
          <label className={styles.label}>Số tầng</label>
          <input
            type="number"
            className={styles.input}
            placeholder="Tầng"
            min={0}
            {...register("floors", { valueAsNumber: true })}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Tình trạng pháp lý <span title="Info"></span>
          </label>
          <div className={styles.selectWrapper}>
            <select className={styles.select} {...register("legalStatus")}>
              <option value="">Chọn tình trạng pháp lý</option>
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
          <label className={styles.label}>Hướng nhà</label>
          <div className={styles.selectWrapper}>
            <select className={styles.select} {...register("houseDirection")}>
              <option value="">Chọn hướng</option>
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
          <label className={styles.label}>Hướng ban công</label>
          <div className={styles.selectWrapper}>
            <select className={styles.select} {...register("balconyDirection")}>
              <option value="">Chọn hướng</option>
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
        <label className={styles.label}>Nội thất</label>
        <div className={styles.selectWrapper}>
          <select className={styles.select} {...register("furniture")}>
            <option value="">Chọn trạng thái đồ nội thất</option>
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
  );
};

export default Step5Features;
