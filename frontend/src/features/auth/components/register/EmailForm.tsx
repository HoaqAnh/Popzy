import { Link } from "react-router-dom";
import styles from "./EmailForm.module.css";
import GoogleIcon from "@/assets/Google.svg";
import FacebookIcon from "@/assets/Facebook.svg";
import AppleIcon from "@/assets/Apple.svg";
import type { Step1FormValues } from "@/types/realestate";
import { useForm } from "react-hook-form";

type EmailFormProps = {
  defaultValues: Step1FormValues;
  onSubmit: (data: Step1FormValues) => void;
};

const RegisterEmailForm = ({ defaultValues, onSubmit }: EmailFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormValues>({
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  return (
    <>
      <h1 className={styles.title}>Tạo tài khoản</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Địa chỉ Email</label>
          <input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
          />
          {errors.email && (
            <p className={styles.errorText}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            type="tel"
            placeholder="0912 345 678"
            {...register("phone", {
              required: "Vui lòng nhập số điện thoại",
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Số điện thoại Việt Nam không hợp lệ",
              },
            })}
          />
          {errors.phone && (
            <p className={styles.errorText}>{errors.phone.message}</p>
          )}
        </div>

        <button type="submit" className={styles.continueBtn}>
          Tiếp tục
        </button>
      </form>

      <div className={styles.createLink}>
        Đã có tài khoản Popzy? <Link to="/auth/login">Đăng nhập</Link>
      </div>

      <div className={styles.separator}>
        <span>HOẶC</span>
      </div>

      <div className={styles.socialGroup}>
        <button className={styles.socialBtn}>
          <img src={GoogleIcon} alt="Google" className={styles.icon} />
          Tiếp tục với Google
        </button>
        <button className={styles.socialBtn}>
          <img src={FacebookIcon} alt="Facebook" className={styles.icon} />
          Tiếp tục với Facebook
        </button>
        <button className={styles.socialBtn}>
          <img src={AppleIcon} alt="Apple" className={styles.icon} />
          Tiếp tục với Apple
        </button>
      </div>
    </>
  );
};

export default RegisterEmailForm;
