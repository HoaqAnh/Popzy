import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./PasswordForm.module.css";
import type { Step2FormValues } from "@/types/realestate";
import { EyeIcon } from "@/components/common/icon";

type PasswordFormProps = {
  email: string;
  phone: string;
  onRegister: (password: string, fullname: string) => void;
  onBack: () => void;
};

const RegisterPasswordForm = ({
  email,
  phone,
  onRegister,
  onBack,
}: PasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2FormValues>();

  const onSubmit = (data: Step2FormValues) => {
    onRegister(data.password, data.fullname);
  };

  return (
    <>
      <h1 className={styles.title}>Hoàn tất đăng ký</h1>
      <p className={styles.subtitle}>Điền thông tin cá nhân và mật khẩu.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label>Email và số điện thoại</label>
          <div className={styles.emailDisplay}>
            <div style={{ flexGrow: 1, overflow: "hidden" }}>
              <input
                value={email}
                readOnly
                disabled
                style={{
                  borderRadius: "8px 8px 0 0",
                  borderBottom: "1px solid var(--border)",
                }}
              />
            </div>
            <button type="button" onClick={onBack} className={styles.editBtn}>
              Sửa
            </button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.emailDisplay}>
            <div style={{ flexGrow: 1, overflow: "hidden" }}>
              <input
                value={phone}
                readOnly
                disabled
                style={{ borderRadius: "0 0 0 8px" }}
              />
            </div>
            <button type="button" onClick={onBack} className={styles.editBtn}>
              Sửa
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="fullname">Họ và tên</label>
          <input
            id="fullname"
            type="text"
            placeholder="Nhập tên của bạn"
            {...register("fullname", {
              required: "Vui lòng nhập họ và tên",
              minLength: {
                value: 2,
                message: "Tên phải có ít nhất 2 ký tự",
              },
            })}
          />
          {errors.fullname && (
            <p
              style={{
                color: "var(--destructive)",
                fontSize: "13px",
                marginTop: "4px",
                fontWeight: 500,
              }}
            >
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Mật khẩu</label>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.password && (
            <p
              style={{
                color: "var(--destructive)",
                fontSize: "13px",
                marginTop: "4px",
                fontWeight: 500,
              }}
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <button type="submit" className={styles.continueBtn}>
          Hoàn tất đăng ký
        </button>
      </form>

      <div className={styles.createLink}>
        Đã có tài khoản Popzy? <Link to="/auth/login">Đăng nhập</Link>
      </div>
    </>
  );
};

export default RegisterPasswordForm;
