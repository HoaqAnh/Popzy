import { useFormContext } from "react-hook-form";
import styles from "./Step2Details.module.css";
import { type CreateListingFormValues } from "@/types/listing";

const Step2Details = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateListingFormValues>();

  const titleValue = watch("title") || "";
  const descValue = watch("description") || "";

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Mô tả bất động sản của bạn</h1>
      <p className={styles.subtitle}>
        Cung cấp tiêu đề và mô tả hấp dẫn để thu hút người mua tiềm năng.
      </p>

      <div className={styles.formGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="title" className={styles.label}>
            Tiêu đề bản tin
          </label>
          <span className={styles.helpIcon} title="Help info">
            ?
          </span>
        </div>

        <input
          id="title"
          type="text"
          className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
          placeholder="e.g., Spacious 3-Bedroom Family Home with Garden"
          maxLength={100}
          {...register("title", {
            required: "Vui lòng nhập tiêu đề bài đăng",
            minLength: {
              value: 10,
              message: "Tiêu đề nên dài hơn 10 ký tự",
            },
          })}
        />

        <div className={styles.inputFooter}>
          {errors.title && (
            <p className={styles.errorMsg}>{errors.title.message}</p>
          )}
          <span className={styles.counter}>{titleValue.length}/100</span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="description" className={styles.label}>
            Mô tả bản tin
          </label>
          <span className={styles.helpIcon} title="Help info">
            ?
          </span>
        </div>

        <div
          className={`${styles.editorContainer} ${
            errors.description ? styles.inputError : ""
          }`}
        >
          <div className={styles.toolbar}>
            <button type="button" className={styles.toolBtn}>
              <b>B</b>
            </button>
            <button type="button" className={styles.toolBtn}>
              <i>I</i>
            </button>
            <button type="button" className={styles.toolBtn}>
              <u>U</u>
            </button>
            <div className={styles.separator} />
            <button type="button" className={styles.toolBtn}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            <button type="button" className={styles.toolBtn}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3" y2="6" />
                <line x1="3" y1="12" x2="3" y2="12" />
                <line x1="3" y1="18" x2="3" y2="18" />
              </svg>
            </button>
          </div>

          <textarea
            id="description"
            className={styles.textarea}
            placeholder="Start describing your property..."
            rows={8}
            maxLength={2000}
            {...register("description", {
              required: "Vui lòng nhập mô tả",
              minLength: {
                value: 20,
                message: "Mô tả quá ngắn, hãy viết chi tiết hơn.",
              },
            })}
          />
        </div>

        <div className={styles.inputFooter}>
          {errors.description && (
            <p className={styles.errorMsg}>{errors.description.message}</p>
          )}
          <span className={styles.counter}>{descValue.length}/2000 ký tự</span>
        </div>
      </div>
    </div>
  );
};

export default Step2Details;
