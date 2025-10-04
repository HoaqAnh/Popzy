import styles from "./Buy.module.css";

const Buy = () => {
  return (
    <section className={styles.buy}>
      <div className={styles.searchBoxContainer}>
        <div className={styles.searchBox}>
          <form className={styles.searchForm}>
            <input className={styles.searchInput}></input>
            <label className={styles.searchBtn}>🔍</label>
          </form>
        </div>
      </div>
      <div className={styles.filters}></div>
    </section>
  );
};

export default Buy;
