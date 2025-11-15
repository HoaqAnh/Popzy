import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PasswordForm.module.css";

type PasswordFormProps = {
  email: string;
  onLogin: (password: string) => void;
  onEditEmail: () => void;
};

export const PasswordForm = ({
  email,
  onLogin,
  onEditEmail,
}: PasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <>
      <h1 className={styles.title}>Nhập mật khẩu</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.emailDisplay}>
          <input type="email" value={email} readOnly disabled />
          <button
            type="button"
            onClick={onEditEmail}
            className={styles.editBtn}
          >
            Edit
          </button>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mật khẩu"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="currentColor"
              >
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.forgotLink}>
          <a href="#">Quên mật khẩu?</a>
        </div>

        <button type="submit" className={styles.continueBtn}>
          Tiếp tục
        </button>
      </form>
      <div className={styles.createLink}>
        Mới dùng Popzy? <Link to="/auth/register">Tạo tài khoản</Link>
      </div>
    </>
  );
};
