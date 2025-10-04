import { Link, NavLink } from "react-router-dom";
import styles from "./DefaultLayout.module.css";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            <span className={styles.logoDot} />
            <span className={styles.brandText}>Popzy</span>
          </Link>

          <nav className={styles.nav}>
            <NavLink
              to="/buy"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Mua
            </NavLink>
            <NavLink
              to="/sell"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Bán
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
            <Link to="/auth" className={styles.authBtn}>
              Đăng nhập / Đăng ký
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default DefaultLayout;
