import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./UserLayout.module.css";
import Logo from "@/assets/Popzy.svg";
import { getCloudinaryUrl } from "@/utils/image";
import { getAvatarLabel } from "@/utils/format";
import { useLogout } from "@/features/auth/hooks/useLogout";
import {
  SettingsIcon,
  LogOutIcon,
  SearchIcon,
  AddIcon,
  UserIcon,
  MessageIcon,
} from "@/components/common/icon";

export interface UserLayout {
  imageUrl: string;
  name: string;
}

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout, isLoading } = useLogout();
  const [userInfo, setUserInfo] = useState<{
    avatarUrl: string | null;
    label: string;
  }>({
    avatarUrl: null,
    label: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

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
              to="/profile/posts"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Hồ sơ
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Tin nhắn
            </NavLink>
          </nav>

          <div
            className={styles.auth}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={dropdownRef}
          >
            {userInfo.avatarUrl ? (
              <img
                src={userInfo.avatarUrl}
                alt="Avatar"
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatar}>{userInfo.label}</div>
            )}

            <p className={styles.username}></p>

            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <Link
                  to="/buy"
                  className={`${styles.dropdownItem} ${styles.mobileOnly}`}
                >
                  <SearchIcon /> <span>Thông tin nhà đất</span>
                </Link>
                <Link
                  to="/sell"
                  className={`${styles.dropdownItem} ${styles.mobileOnly}`}
                >
                  <AddIcon /> <span>Đăng tin</span>
                </Link>
                <Link
                  to="/profile/posts"
                  className={`${styles.dropdownItem} ${styles.mobileOnly}`}
                >
                  <UserIcon /> <span>Hồ sơ</span>
                </Link>
                <Link
                  to="/messages"
                  className={`${styles.dropdownItem} ${styles.mobileOnly}`}
                >
                  <MessageIcon /> <span>Tin nhắn</span>
                </Link>

                <div
                  className={`${styles.dropdownDivider} ${styles.mobileOnly}`}
                ></div>
                <Link to="/favorites" className={styles.dropdownItem}>
                  <span>Bài viết yêu thích</span>
                </Link>

                <div className={styles.dropdownDivider}></div>

                <Link to="/profile/settings" className={styles.dropdownItem}>
                  <SettingsIcon /> <span>Cài đặt tài khoản</span>
                </Link>

                <div className={styles.dropdownDivider}></div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className={styles.dropdownItem}
                  disabled={isLoading}
                >
                  <LogOutIcon />
                  <span>{isLoading ? "Đang xử lý..." : "Đăng xuất"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
