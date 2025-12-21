import { SearchIcon } from "@/components/common/icon";
import styles from "./SearchHeader.module.css";
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
            <SearchIcon />
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
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };
  return (
    <div
      className={`${styles.dropdown} ${open ? styles.open : ""}`}
      onBlur={handleBlur}
    >
      <button
        className={styles.dropdownBtn}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        type="button"
      >
        {label} <span className={styles.caret}>▾</span>
      </button>
      {open && <div className={styles.dropdownPanel}>{children}</div>}
    </div>
  );
};

export default SearchHeader;
