import { useFormContext } from "react-hook-form";
import styles from "./Step4Specs.module.css";
import { type CreateListingFormValues } from "@/types/listing";

const Step4Specs = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateListingFormValues>();

  const bedrooms = watch("bedrooms") || 0;
  const bathrooms = watch("bathrooms") || 0;

  const handleCounter = (
    field: "bedrooms" | "bathrooms",
    operation: "increment" | "decrement"
  ) => {
    const currentValue = field === "bedrooms" ? bedrooms : bathrooms;
    const newValue =
      operation === "increment"
        ? currentValue + 1
        : Math.max(0, currentValue - 1);

    setValue(field, newValue, { shouldValidate: true });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Provide Key Details About Your Property</h1>
      <p className={styles.subtitle}>
        This essential information helps potential buyers quickly understand the
        basics of your property.
      </p>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="area" className={styles.label}>
            Area (Diện tích)
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="area"
              type="number"
              placeholder="Enter the total area"
              className={`${styles.input} ${styles.hasSuffix} ${
                errors.area ? styles.inputError : ""
              }`}
              min={0}
              {...register("area", {
                required: "Vui lòng nhập diện tích",
                min: { value: 1, message: "Diện tích phải lớn hơn 0" },
                valueAsNumber: true,
              })}
            />
            <span className={styles.suffix}>m²</span>
          </div>
          {errors.area && (
            <p className={styles.errorMsg}>{errors.area.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>
            Selling Price (Mức giá)
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="price"
              type="number"
              placeholder="Enter the selling price"
              className={`${styles.input} ${styles.hasSuffix} ${
                errors.price ? styles.inputError : ""
              }`}
              min={0}
              {...register("price", {
                required: "Vui lòng nhập giá bán",
                min: { value: 1000, message: "Giá bán không hợp lệ" },
                valueAsNumber: true,
              })}
            />
            <span className={styles.suffix}>VND</span>
          </div>
          {errors.price && (
            <p className={styles.errorMsg}>{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Number of Bedrooms</label>
          <div className={styles.counterWrapper}>
            <button
              type="button"
              className={styles.counterBtn}
              onClick={() => handleCounter("bedrooms", "decrement")}
            >
              −
            </button>
            <input
              className={styles.counterInput}
              type="number"
              readOnly
              {...register("bedrooms", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
            />
            <button
              type="button"
              className={styles.counterBtn}
              onClick={() => handleCounter("bedrooms", "increment")}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Number of Bathrooms</label>
          <div className={styles.counterWrapper}>
            <button
              type="button"
              className={styles.counterBtn}
              onClick={() => handleCounter("bathrooms", "decrement")}
            >
              −
            </button>
            <input
              className={styles.counterInput}
              type="number"
              readOnly
              {...register("bathrooms", {
                required: true,
                min: 0,
                valueAsNumber: true,
              })}
            />
            <button
              type="button"
              className={styles.counterBtn}
              onClick={() => handleCounter("bathrooms", "increment")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Specs;
