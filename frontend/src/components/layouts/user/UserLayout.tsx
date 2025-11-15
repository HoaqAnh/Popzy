import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./UserLayout.module.css";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
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
            <div className={styles.avatar}>
              <span className={styles.avatarDot} />
            </div>
            <div className={styles.username}>Nguyễn Văn A</div>
          </div>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default UserLayout;
