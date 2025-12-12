import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./UserLayout.module.css";
import Logo from "@/assets/Popzy.svg";
import { getCloudinaryUrl } from "@/utils/image";
import { getAvatarLabel } from "@/utils/format";

export interface UserLayout {
  imageUrl: string;
  name: string;
}

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const navigator = useNavigate();
  const [userInfo, setUserInfo] = useState<{ avatarUrl: string | null; label: string }>({
    avatarUrl: null,
    label: "",
  });

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("popzy-user");

      if (storedUser) {
        const parsedUser: UserLayout = JSON.parse(storedUser);
        const label = getAvatarLabel(parsedUser.name || "");
        let url = null;

        if (parsedUser.imageUrl) {
          url = getCloudinaryUrl(parsedUser.imageUrl);
        }

        setUserInfo({
          avatarUrl: url,
          label: label,
        });
      }
    } catch (error) {
      console.error("Lỗi khi đọc thông tin user từ localStorage:", error);
    }
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            <img src={Logo} alt="Popzy" className={styles.logo} />
            <span className={styles.brandText}>Popzy</span>
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/buy" className={({ isActive }) => (isActive ? styles.active : undefined)}>
              Thông tin nhà đất
            </NavLink>

            <NavLink
              to="/sell"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              Đăng tin
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              Tin nhắn
            </NavLink>

            <NavLink
              to="/profile/settings"
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              Hồ sơ
            </NavLink>
          </nav>

          <div className={styles.auth} onClick={() => navigator("/profile/settings")}>
            {userInfo.avatarUrl ? (
              <img src={userInfo.avatarUrl} alt="Avatar" className={styles.avatar} />
            ) : (
              <div className={styles.avatar}>{userInfo.label}</div>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
