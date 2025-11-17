import { useState } from "react";
import styles from "./ResetForm.module.css";

type ResetFormProps = {
  onSubmit: (password: string) => void;
};

const ForgotPasswordResetForm = ({ onSubmit }: ResetFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    setError("");
    onSubmit(password);
  };

  const EyeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="currentColor"
    >
      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z" />
    </svg>
  );

  return (
    <>
      <h1 className={styles.title}>Nhập mật khẩu mới</h1>
      <p className={styles.subtitle}>
        Để truy cập tài khoản của bạn, hãy nhập mật khẩu mới.
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu mới"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.passwordWrapper}>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Xác nhận mật khẩu"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <button type="submit" className={styles.continueBtn}>
          Xác nhận
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordResetForm;
