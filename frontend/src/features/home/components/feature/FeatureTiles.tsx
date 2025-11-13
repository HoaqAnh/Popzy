import styles from "./FeatureTiles.module.css";
import { Link } from "react-router-dom";
import { homeMockData } from "@/mocks/home";

export default function FeatureTiles() {
  const tiles = [
    {
      title: "Mua nhà",
      desc: "Khám phá bất động sản phù hợp nhu cầu của bạn.",
      to: "/buy",
      cta: "Xem nhà bán",
      imgUrl: homeMockData.featureTileImages[0],
    },
    {
      title: "Bán nhà",
      desc: "Công cụ đơn giản giúp đăng tin và tiếp cận người mua.",
      to: "/sell",
      cta: "Đăng tin bán",
      imgUrl: homeMockData.featureTileImages[1],
    },
    {
      title: "Hỗ trợ",
      desc: "Câu hỏi thường gặp và kênh hỗ trợ chính thức của Popzy.",
      to: "/support",
      cta: "Trung tâm trợ giúp",
      imgUrl: homeMockData.featureTileImages[2],
    },
  ];

  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        {tiles.map((t) => (
          <article key={t.title} className={styles.card}>
            <img
              src={t.imgUrl}
              alt={t.title}
              className={styles.featureImage}
              loading="lazy"
            />
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