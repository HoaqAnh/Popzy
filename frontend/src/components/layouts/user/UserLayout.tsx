import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./UserLayout.module.css";
import Logo from "@/assets/Popzy.svg";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const navigator = useNavigate();
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
              to="/profile/settings"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Hồ sơ
            </NavLink>
          </nav>

          <div
            className={styles.auth}
            onClick={() => navigator("/profile/settings")}
          >
            <img
              src={
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200"
              }
              alt="Avatar"
              className={styles.avatar}
            />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
