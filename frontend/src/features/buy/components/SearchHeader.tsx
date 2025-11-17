import styles from "@/pages/buy/buy.module.css";
import { useState } from "react";

const SearchHeader = () => {
  return (
    <section className={styles.searchHeader} aria-label="Search Page Header">
      <div className={styles.searchRow}>
        <div className={styles.searchbox}>
          <input
            placeholder="Địa chỉ, khu vực, thành phố, ZIP"
            aria-label="Từ khóa tìm kiếm"
          />
          <button className={styles.iconBtn} aria-label="Tìm kiếm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
        </div>

        <div className={styles.filters}>
          <Dropdown label="Khoảng giá">
            <div className={`${styles.menu} ${styles.grid2}`}>
              <label>
                <span>Giá thấp nhất</span>
                <input type="number" min={0} placeholder="Từ" />
              </label>
              <label>
                <span>Giá cao nhất</span>
                <input type="number" min={0} placeholder="Đến" />
              </label>
            </div>
          </Dropdown>

          <Dropdown label="Số PN & PT">
            <div className={`${styles.menu} ${styles.grid2}`}>
              <label>
                <span>Số phòng ngủ</span>
                <input type="number" min={0} />
              </label>
              <label>
                <span>Số phòng tắm</span>
                <input type="number" min={0} />
              </label>
            </div>
          </Dropdown>

          <Dropdown label="Loại nhà đất">
            <div className={styles.menu}>
              {[
                { key: "apartment", label: "Căn hộ" },
                { key: "studio", label: "Studio" },
                { key: "house", label: "Nhà phố" },
                { key: "villa", label: "Biệt thự" },
              ].map((t) => (
                <label key={t.key} className={styles.check}>
                  <input type="checkbox" />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </Dropdown>

          <Dropdown label="Diện tích (m²)">
            <div className={`${styles.menu} ${styles.grid2}`}>
              <label>
                <span>Nhỏ nhất</span>
                <input type="number" min={0} placeholder="Từ" />
              </label>
              <label>
                <span>Lớn nhất</span>
                <input type="number" min={0} placeholder="Đến" />
              </label>
            </div>
          </Dropdown>

          <button className={styles.saveBtn}>Save search</button>
        </div>
      </div>
    </section>
  );
};

const Dropdown = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${styles.dropdown} ${open ? styles.open : ""}`}
      onBlur={() => setOpen(false)}
    >
      <button
        className={styles.dropdownBtn}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label} <span className={styles.caret}>▾</span>
      </button>
      {open && <div className={styles.dropdownPanel}>{children}</div>}
    </div>
  );
};

export default SearchHeader;
