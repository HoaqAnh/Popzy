import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { homeMockData } from "@/mocks/home";
import GoogleIcon from "@/assets/Google.svg";
import FacebookIcon from "@/assets/Facebook.svg";
import AppleIcon from "@/assets/Apple.svg";
import Logo from "@/assets/Popzy.svg";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.formCol}>
        <div className={styles.formContent}>
          <Link to="/" className={styles.brand}>
            <img src={Logo} alt="Popzy" className={styles.logo} />
            <span className={styles.brandText}>Popzy</span>
          </Link>

          <h1 className={styles.title}>Đăng nhập</h1>

          <form
            onSubmit={() => {
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
        </div>
      </main>

      <aside
        className={styles.imageCol}
        style={{ backgroundImage: `url(${homeMockData.authImageUrl})` }}
        aria-label="Ngôi nhà"
      />
    </div>
  );
}
