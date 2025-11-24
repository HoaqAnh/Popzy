import styles from "./SellHero.module.css";
import { homeMockData } from "@/mocks/home";

const SellHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src={homeMockData.authImageUrl}
            alt="Sell your home"
            className={styles.heroImage}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            Hiệu quả <br /> và nhanh chóng
          </h1>
          <p className={styles.subtitle}>
            Đưa tin đăng của bạn đến với hàng ngàn khách hàng tiềm năng. Quy
            trình đăng tin của chúng tôi nhanh chóng, đơn giản và hiệu quả.
          </p>
          <button className={styles.ctaBtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Bắt đầu đăng tin
          </button>
        </div>
      </div>
    </section>
  );
};

export default SellHero;
