import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.cols}>
        <div className={styles.col}>
          <h4>Về Popzy</h4>
          <ul>
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Điều khoản</li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>Dịch vụ</h4>
          <ul>
            <li>Mua nhà</li>
            <li>Bán nhà</li>
            <li>Hỗ trợ</li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>Tài nguyên</h4>
          <ul>
            <li>Blog</li>
            <li>Trung tâm trợ giúp</li>
            <li>Liên hệ</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Popzy</span>
      </div>
    </footer>
  );
};

export default Footer;
