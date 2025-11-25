import styles from "./SellHero.module.css";
import { homeMockData } from "@/mocks/home";
import { AddIcon } from "@/components/common/icon";

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
            <AddIcon />
            Bắt đầu đăng tin
          </button>
        </div>
      </div>
    </section>
  );
};

export default SellHero;
