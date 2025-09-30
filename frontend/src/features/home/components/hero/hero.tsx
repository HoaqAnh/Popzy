import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.content}>
        <h1 className={styles.title}>Agents. Tours. Loans. Homes.</h1>
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
}