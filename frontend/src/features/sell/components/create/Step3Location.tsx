import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Step3Location.module.css";
import { type CreateListingFormValues } from "@/types/listing";
import { cities, districts } from "@/mocks/locations";

const Step3Location = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateListingFormValues>();

  const selectedCity = watch("city");

  useEffect(() => {}, [selectedCity]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("city", e.target.value);
    setValue("district", "");
  };

  const currentDistricts = selectedCity ? districts[selectedCity] || [] : [];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Where is your property located?</h1>
      <p className={styles.subtitle}>
        Start by selecting the city and then the district. This helps buyers
        find your listing easily.
      </p>

      <div className={styles.formGroup}>
        <label htmlFor="city" className={styles.label}>
          City / Province (Tỉnh / Thành phố)
        </label>
        <div className={styles.selectWrapper}>
          <select
            id="city"
            className={`${styles.select} ${
              errors.city ? styles.inputError : ""
            }`}
            {...register("city", {
              required: "Vui lòng chọn Tỉnh / Thành phố",
              onChange: handleCityChange,
            })}
          >
            <option value="">Select City / Province</option>
            {cities.map((city) => (
              <option key={city.code} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>▼</span>
        </div>
        {errors.city && (
          <p className={styles.errorMsg}>{errors.city.message}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="district" className={styles.label}>
          District / Ward (Quận / Huyện)
        </label>
        <div className={styles.selectWrapper}>
          <select
            id="district"
            className={`${styles.select} ${
              errors.district ? styles.inputError : ""
            }`}
            disabled={!selectedCity}
            {...register("district", {
              required: "Vui lòng chọn Quận / Huyện",
            })}
          >
            <option value="">Select District / Ward</option>
            {currentDistricts.map((dist) => (
              <option key={dist.code} value={dist.code}>
                {dist.name}
              </option>
            ))}
          </select>
          <span className={styles.arrow}>▼</span>
        </div>
        {errors.district && (
          <p className={styles.errorMsg}>{errors.district.message}</p>
        )}
      </div>
    </div>
  );
};

export default Step3Location;
