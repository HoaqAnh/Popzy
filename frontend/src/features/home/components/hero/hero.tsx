import styles from "./Hero.module.css";
import { homeMockData } from "@/mocks/home";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${homeMockData.heroImageUrl})` }}
      />
      <div className={styles.overlay} />
      
      <div className={styles.content}>
        <h1 className={styles.title}>Giao dịch bất động sản. Việt Nam.</h1>
        <div className={styles.searchBar}>
          <input
            className={styles.input}
            placeholder="Nhập địa chỉ, khu vực hoặc mã ZIP"
            readOnly
          />
          <button className={styles.searchBtn} aria-label="Search" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
