import { Link, NavLink } from "react-router-dom";
import styles from "./DefaultLayout.module.css";
import Logo from "@/assets/Popzy.svg";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            <img src={Logo} alt="Popzy" className={styles.logo} />
            <span className={styles.brandText}>Popzy</span>
          </Link>

          <nav className={styles.nav}>
            <NavLink
              to="/buy"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Thông tin nhà đất
            </NavLink>

            <NavLink
              to="/sell"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Đăng tin
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Tin nhắn
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Hỗ trợ
            </NavLink>
          </nav>

          <div className={styles.auth}>
            <Link to="/auth/login" className={styles.authBtn}>
              Đăng nhập / Đăng ký
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
