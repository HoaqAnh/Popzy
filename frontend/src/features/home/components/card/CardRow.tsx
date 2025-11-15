import styles from "./CardRow.module.css";
import { homeMockData } from "@/mocks/home";

export default function CardRow() {
  return (
    <section className={styles.wrap}>
      <div className={styles.head}>
        <h2>Nhà cho bạn</h2>
        <p>Dựa trên những căn nhà bạn đã xem gần đây</p>
      </div>

      <div className={styles.row}>
        {homeMockData.cardRowImages.map((card) => (
          <article key={card.id} className={styles.card}>
            <img
              src={card.url}
              alt="Minh họa nhà"
              className={styles.cardImage}
              loading="lazy"
            />
            <div className={styles.meta}>
              <div className={styles.titleBar} />
              <div className={styles.subBar} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
