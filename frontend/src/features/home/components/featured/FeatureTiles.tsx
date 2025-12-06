import styles from "./FeatureTiles.module.css";
import { SheildIcon, PeopleIcon, TaskIcon } from "@/components/common/icon";

const FeatureTiles = () => {
  const features = [
    {
      icon: <TaskIcon />,
      title: "Định giá bằng AI",
      desc: "Thuật toán của chúng tôi phân tích hàng ngàn so sánh để cung cấp cho bạn định giá nhà chính xác nhất trong vài giây, không phải vài ngày.",
    },
    {
      icon: <SheildIcon />,
      title: "Cộng đồng xác thực",
      desc: "Mỗi đại lý, người mua và người bán trên Popzy đều được xác minh, tạo ra một thị trường an toàn và đáng tin cậy cho mọi người.",
    },
    {
      icon: <PeopleIcon />,
      title: "Hỗ trợ tức thì",
      desc: "Có câu hỏi? Đội ngũ hỗ trợ chuyên nghiệp và trợ lý AI của chúng tôi luôn sẵn sàng 24/7 để hướng dẫn bạn đến khi hoàn tất.",
    },
  ];

  return (
    <section className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tại sao chọn Popzy?</h2>
        <p className={styles.subtitle}>
          Chúng tôi đang định nghĩa lại trải nghiệm bất động sản với công nghệ giúp bạn kiểm soát.
        </p>
      </div>

      <div className={styles.grid}>
        {features.map((f, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.iconWrapper}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeatureTiles;
