import styles from "./SellFeatures.module.css";
import { PeopleIcon, TaskIcon, SheildIcon } from "@/components/common/icon";

const SellFeatures = () => {
  const features = [
    {
      icon: <PeopleIcon />,
      title: "Tiếp cận rộng rãi",
      desc: "Kết nối với mạng lưới người mua và thuê nhà rộng lớn trên khắp cả nước.",
    },
    {
      icon: <TaskIcon />,
      title: "Quy trình đơn giản",
      desc: "Tạo tin đăng chuyên nghiệp, đầy đủ thông tin chỉ trong vài bước dễ dàng.",
    },
    {
      icon: <SheildIcon />,
      title: "Nền tảng tin cậy",
      desc: "Tham gia cùng hàng nghìn người dùng tin tưởng và thành công trên nền tảng của chúng tôi.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Tại sao nên đăng tin trên Popzy?</h2>
        <p className={styles.subHeading}>
          Chúng tôi cung cấp các công cụ và phạm vi tiếp cận để bạn kết nối
          thành công với những người mua và người thuê tiềm năng.
        </p>
      </div>

      <div className={styles.grid}>
        {features.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.iconWrapper}>{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SellFeatures;
