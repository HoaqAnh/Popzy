import styles from "./CardRow.module.css";

export default function CardRow() {
  return (
    <section className={styles.wrap}>
      <div className={styles.head}>
        <h2>Homes For You</h2>
        <p>Based on homes you recently viewed</p>
      </div>

      <div className={styles.row}>
        {Array.from({ length: 4 }).map((_, i) => (
          <article key={i} className={styles.card} aria-label="placeholder">
            <div className={styles.img} />
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
