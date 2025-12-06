import styles from "./SellCTA.module.css";
import { useNavigate } from "react-router-dom";

const SellCTA = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h2 className={styles.title}>Bán nhà thông minh hơn với Popzy</h2>
          <p className={styles.desc}>
            Khám phá tiềm năng thực sự của ngôi nhà bạn. Nhận định giá tức thì và kết nối với các
            đại lý hàng đầu trong khu vực miễn phí.
          </p>
        </div>
        <button className={styles.btn} onClick={() => navigate("/sell/create")}>
          Đăng tin miễn phí →
        </button>
      </div>
    </section>
  );
};

export default SellCTA;
