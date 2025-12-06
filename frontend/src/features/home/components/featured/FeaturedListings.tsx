import styles from "./FeaturedListings.module.css";
import { homeMockData } from "@/mocks/home";
import { formatPrice } from "@/utils/format";
import { Link } from "react-router-dom";

const FeaturedListings = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.heading}>Nhà nổi bật</h2>
          <p className={styles.subHeading}>
            Những bất động sản được chọn lọc dành riêng cho bạn trong khu vực.
          </p>
        </div>
        <Link to="/buy" className={styles.viewAll}>
          Xem tất cả →
        </Link>
      </div>

      <div className={styles.grid}>
        {homeMockData.featuredListings.map((item) => (
          <article key={item.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt="House" className={styles.image} />
              <span className={styles.tag} style={{ backgroundColor: item.tagColor }}>
                {item.tag}
              </span>
              <button className={styles.heartBtn}>♥</button>
            </div>
            <div className={styles.content}>
              <div className={styles.price}>{formatPrice(item.price)}</div>
              <div className={styles.address}>{item.address}</div>
              <div className={styles.specs}>
                <span className={styles.specItem}>🛏 {item.beds} P. Ngủ</span>
                <span className={styles.specItem}>🚿 {item.baths} P. Tắm</span>
                <span className={styles.specItem}>📐 {item.area} m²</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
