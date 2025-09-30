import styles from "./FeatureTiles.module.css";
import { Link } from "react-router-dom";

export default function FeatureTiles() {
  const tiles = [
    {
      title: "Mua nhà",
      desc: "Khám phá bất động sản phù hợp nhu cầu của bạn.",
      to: "/buy",
      cta: "Xem nhà bán",
    },
    {
      title: "Bán nhà",
      desc: "Công cụ đơn giản giúp đăng tin và tiếp cận người mua.",
      to: "/sell",
      cta: "Đăng tin bán",
    },
    {
      title: "Hỗ trợ",
      desc: "Câu hỏi thường gặp và kênh hỗ trợ chính thức của Popzy.",
      to: "/support",
      cta: "Trung tâm trợ giúp",
    },
  ];

  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        {tiles.map((t) => (
          <article key={t.title} className={styles.card}>
            <div className={styles.illus} />
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <Link to={t.to} className={styles.cta}>
              {t.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
