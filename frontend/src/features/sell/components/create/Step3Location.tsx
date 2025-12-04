import { useFormContext } from "react-hook-form";
import styles from "./Step3Location.module.css";
import { type CreateListingFormValues } from "@/types/listing";

const Step3Location = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateListingFormValues>();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Bất động sản của bạn ở đâu?</h1>
      <p className={styles.subtitle}>
        Nhập chính xác địa chỉ để người mua dễ dàng tìm thấy bất động sản của
        bạn.
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="city" className={styles.label}>
          Thành phố / Tỉnh
        </label>
        <input
          id="city"
          type="text"
          placeholder="Ví dụ: Hà Nội, TP. Hồ Chí Minh..."
          className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
          {...register("city", {
            required: "Vui lòng nhập Tỉnh / Thành phố",
          })}
        />
        {errors.city && (
          <p className={styles.errorMsg}>{errors.city.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="district" className={styles.label}>
          Quận / Huyện
        </label>
        <input
          id="district"
          type="text"
          placeholder="Ví dụ: Cầu Giấy, Quận 1..."
          className={`${styles.input} ${
            errors.district ? styles.inputError : ""
          }`}
          {...register("district", {
            required: "Vui lòng nhập Quận / Huyện",
          })}
        />
        {errors.district && (
          <p className={styles.errorMsg}>{errors.district.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step3Location;
