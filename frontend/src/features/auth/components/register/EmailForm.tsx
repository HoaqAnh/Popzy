import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./EmailForm.module.css";
import GoogleIcon from "@/assets/Google.svg";
import FacebookIcon from "@/assets/Facebook.svg";
import AppleIcon from "@/assets/Apple.svg";

type EmailFormProps = {
  onSubmit: (email: string) => void;
};

export const RegisterEmailForm = ({ onSubmit }: EmailFormProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <>
      <h1 className={styles.title}>Tạo tài khoản</h1>
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
