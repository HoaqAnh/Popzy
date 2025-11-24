import styles from "./SellFeatures.module.css";

const SellFeatures = () => {
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Tiếp cận rộng rãi",
      desc: "Kết nối với mạng lưới người mua và thuê nhà rộng lớn trên khắp cả nước.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
      title: "Quy trình đơn giản",
      desc: "Tạo tin đăng chuyên nghiệp, đầy đủ thông tin chỉ trong vài bước dễ dàng.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
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
