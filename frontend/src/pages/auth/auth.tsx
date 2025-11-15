import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { homeMockData } from "@/mocks/home";

const GoogleIcon = () => (
  <svg height="20" width="20" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
  <svg height="20" width="20" viewBox="0 0 24 24">
    <path
      d="M12 2C9.25 2 7 4.25 7 7c0 2.05 1.2 3.8 2.9 4.56-2.6 1.1-4.4 3.9-4.4 7.44 0 4.42 3.58 8 8 8s8-3.58 8-8c0-3.54-1.8-6.34-4.4-7.44C18.8 10.8 20 9.05 20 7c0-2.75-2.25-5-5-5h-3zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6z"
      fill="#000000"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg height="20" width="20" viewBox="0 0 24 24">
    <path
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
      fill="#1877F2"
    />
  </svg>
);

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.formCol}>
        <div className={styles.formContent}>
          <Link to="/" className={styles.brand}>
            <span className={styles.logoDot} />
            <span className={styles.brandText}>Popzy</span>
          </Link>

          <h1 className={styles.title}>Đăng nhập</h1>

          <form
            onSubmit={(e) => {
              navigate("/");
            }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="email">Địa chỉ Email</label>
              <input id="email" type="email" required />
            </div>
            <button type="submit" className={styles.continueBtn}>
              Tiếp tục
            </button>
          </form>

          <div className={styles.createLink}>
            Mới dùng Popzy? <Link to="/auth/register">Tạo tài khoản</Link>
          </div>

          <div className={styles.separator}>
            <span>HOẶC</span>
          </div>

          <div className={styles.socialGroup}>
            <button className={styles.socialBtn}>
              <GoogleIcon /> Tiếp tục với Google
            </button>
            <button className={styles.socialBtn}>
              <AppleIcon /> Tiếp tục với Apple
            </button>
            <button className={styles.socialBtn}>
              <FacebookIcon /> Tiếp tục với Facebook
            </button>
          </div>
        </div>
      </main>

      <aside
        className={styles.imageCol}
        style={{ backgroundImage: `url(${homeMockData.authImageUrl})` }}
        aria-label="Ngôi nhà có gia đình đang sinh hoạt"
      />
    </div>
  );
}
