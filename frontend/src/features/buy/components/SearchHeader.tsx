import styles from "@/pages/buy/buy.module.css";
import { useState } from "react";

export type Filters = {
  dealType: "for-sale" | "for-rent";
  minPrice: number;
  maxPrice: number;
  minBeds: number;
  minBaths: number;
  homeTypes: string[];
};

export const SearchHeader = ({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
}: {
  query: string;
  onQueryChange: (s: string) => void;
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
}) => {
  return (
    <section className={styles.searchHeader} aria-label="Search Page Header">
      <div className={styles.searchRow}>
        <div className={styles.searchbox}>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
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
          <Dropdown
            label={filters.dealType === "for-sale" ? "For Sale" : "For Rent"}
          >
            <div className={styles.menu}>
              <button
                onClick={() =>
                  onFiltersChange({ ...filters, dealType: "for-sale" })
                }
                className={
                  filters.dealType === "for-sale" ? styles.activeBtn : undefined
                }
              >
                For Sale
              </button>
              <button
                onClick={() =>
                  onFiltersChange({ ...filters, dealType: "for-rent" })
                }
                className={
                  filters.dealType === "for-rent" ? styles.activeBtn : undefined
                }
              >
                For Rent
              </button>
            </div>
          </Dropdown>

          <Dropdown label="Price">
            <div className={`${styles.menu} ${styles.grid2}`}>
              <label>
                <span>Min</span>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      minPrice: Number(e.target.value || 0),
                    })
                  }
                />
              </label>
              <label>
                <span>Max</span>
                <input
                  type="number"
                  min={0}
                  placeholder="∞"
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      maxPrice: e.target.value
                        ? Number(e.target.value)
                        : Infinity,
                    })
                  }
                />
              </label>
            </div>
          </Dropdown>

          <Dropdown label="Beds & Baths">
            <div className={`${styles.menu} ${styles.grid2}`}>
              <label>
                <span>Beds ≥</span>
                <input
                  type="number"
                  min={0}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      minBeds: Number(e.target.value || 0),
                    })
                  }
                />
              </label>
              <label>
                <span>Baths ≥</span>
                <input
                  type="number"
                  min={0}
                  onChange={(e) =>
                    onFiltersChange({
                      ...filters,
                      minBaths: Number(e.target.value || 0),
                    })
                  }
                />
              </label>
            </div>
          </Dropdown>

          <Dropdown label="Home Type">
            <div className={styles.menu}>
              {[
                { key: "apartment", label: "Căn hộ" },
                { key: "studio", label: "Studio" },
                { key: "house", label: "Nhà phố" },
                { key: "villa", label: "Biệt thự" },
              ].map((t) => (
                <label key={t.key} className={styles.check}>
                  <input
                    type="checkbox"
                    checked={filters.homeTypes.includes(t.key)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...filters.homeTypes, t.key]
                        : filters.homeTypes.filter((x) => x !== t.key);
                      onFiltersChange({ ...filters, homeTypes: next });
                    }}
                  />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </Dropdown>

          <Dropdown label="More">
            <div className={styles.menu}>
              <p className={styles.muted}>
                Sắp xếp, hướng nhà, pháp lý… (giả lập)
              </p>
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
