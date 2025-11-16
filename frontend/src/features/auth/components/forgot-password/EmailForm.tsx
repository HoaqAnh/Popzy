import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EmailForm.module.css";

type EmailFormProps = {
  onSubmit: (email: string) => void;
};

export const ForgotPasswordEmailForm = ({ onSubmit }: EmailFormProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <>
      <h1 className={styles.title}>Quên mật khẩu?</h1>
      <p className={styles.subtitle}>
        Chúng tôi sẽ gửi hướng dẫn đến email của bạn để đặt lại mật khẩu.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Địa chỉ Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
          />
        </div>
        <button type="submit" className={styles.continueBtn}>
          Tiếp tục
        </button>
      </form>

      <div className={styles.backLink}>
        <Link to="/auth/login">Quay lại đăng nhập</Link>
      </div>
    </>
  );
};
