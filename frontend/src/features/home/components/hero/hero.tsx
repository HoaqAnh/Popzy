import styles from "./Hero.module.css";
import { homeMockData } from "@/mocks/home";
import { SearchIcon } from "@/components/common/icon";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} style={{ backgroundImage: `url(${homeMockData.heroImageUrl})` }} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Tìm ngôi nhà của bạn với Popzy</h1>
        <p className={styles.subtitle}>
          Khám phá ngôi nhà hoàn hảo cho bạn với nền tảng bất động sản được hỗ trợ bởi mô hình AI.
        </p>

        <div className={styles.searchBar}>
          <div className={styles.inputGroup}>
            <input className={styles.input} placeholder="Tìm kiếm thành phố, khu vực..." />
          </div>

          <button className={styles.searchBtn}>
            <SearchIcon />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
