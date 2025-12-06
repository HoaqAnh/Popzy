import styles from "./MarketInsights.module.css";
import { Link } from "react-router-dom";

const MarketInsights = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <span className={styles.tag}>📈 Nhịp đập thị trường</span>
          <h2 className={styles.title}>Thông tin Bất động sản</h2>
          <p className={styles.desc}>
            Đi trước xu hướng với phân tích thị trường do AI của Popzy điều khiển. Chúng tôi xử lý
            hàng triệu điểm dữ liệu để dự đoán xu hướng giá, sự phát triển của khu vực và cơ hội đầu
            tư trước khi chúng xảy ra.
          </p>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              Giá trị tăng 4.2% trong khu vực mục tiêu của bạn
            </div>
            <div className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              Thời gian trung bình trên thị trường: 14 ngày
            </div>
          </div>

          <Link to="/buy" className={styles.readMore}>
            Đọc báo cáo đầy đủ →
          </Link>
        </div>

        {/* Mock Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>
              <h3>Dự đoán giá 2024</h3>
              <span>Giá trị trung bình nhà ($312k/căn)</span>
            </div>
            <span style={{ fontSize: "12px", fontWeight: 600 }}>5 tháng qua</span>
          </div>

          <div className={styles.chartBars}>
            {[40, 55, 45, 70, 85, 100].map((h, idx) => (
              <div key={idx} className={styles.barCol}>
                <div
                  className={styles.bar}
                  style={{
                    height: `${h * 1.5}px`,
                    backgroundColor: idx === 5 ? "#0ea5e9" : "#bfdbfe",
                  }}
                />
                <span className={styles.barLabel}>THG {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
