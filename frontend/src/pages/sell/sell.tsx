import styles from "./sell.module.css";
import { myPosts } from "@/mocks/myPosts";
import { formatPrice } from "@/utils/format";

const Sell = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Chức năng đang được phát triển!");
  };

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        {/* === CỘT 1: FORM ĐĂNG BÀI === */}
        <section className={styles.formSection}>
          <h1 className={styles.title}>Tạo bài đăng mới</h1>

          <div className={styles.formCard}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Tiêu đề */}
              <div className={styles.formGroup}>
                <label htmlFor="title">Tiêu đề</label>
                <input
                  id="title"
                  type="text"
                  placeholder="VD: Bán nhà mặt phố..."
                  required
                />
              </div>

              {/* Mô tả */}
              <div className={styles.formGroup}>
                <label htmlFor="description">Mô tả chi tiết</label>
                <textarea
                  id="description"
                  placeholder="Mô tả chi tiết về bất động sản..."
                  required
                />
              </div>

              {/* Giá và Diện tích */}
              <div className={styles.gridPair}>
                <div className={styles.formGroup}>
                  <label htmlFor="price">Giá (VND)</label>
                  <input
                    id="price"
                    type="number"
                    min={0}
                    placeholder="VD: 2950000000"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="area">Diện tích (m²)</label>
                  <input
                    id="area"
                    type="number"
                    min={0}
                    placeholder="VD: 95"
                    required
                  />
                </div>
              </div>

              {/* Địa chỉ */}
              <div className={styles.gridPair}>
                <div className={styles.formGroup}>
                  <label htmlFor="city">Thành phố</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="VD: Hà Nội"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="district">Quận/Huyện</label>
                  <input
                    id="district"
                    type="text"
                    placeholder="VD: Cầu Giấy"
                    required
                  />
                </div>
              </div>

              {/* Phòng ngủ và Phòng tắm */}
              <div className={styles.gridPair}>
                <div className={styles.formGroup}>
                  <label htmlFor="beds">Số phòng ngủ</label>
                  <input
                    id="beds"
                    type="number"
                    min={0}
                    placeholder="VD: 3"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="baths">Số phòng tắm</label>
                  <input
                    id="baths"
                    type="number"
                    min={0}
                    placeholder="VD: 2"
                    required
                  />
                </div>
              </div>

              {/* Hình ảnh (Tạm thời) */}
              <div className={styles.formGroup}>
                <label htmlFor="images">Hình ảnh (URLs)</label>
                <textarea
                  id="images"
                  placeholder="Nhập URLs hình ảnh, cách nhau bằng dấu phẩy..."
                />
                {/* <small>
                  Tạm thời nhập URL. Chức năng upload sẽ được phát triển sau.
                </small> */}
              </div>

              {/* Nút Submit */}
              <button type="submit" className={styles.submitBtn}>
                Đăng tin
              </button>
            </form>
          </div>
        </section>

        {/* === CỘT 2: DANH SÁCH BÀI ĐÃ ĐĂNG === */}
        <section className={styles.listSection}>
          <h1 className={styles.title}>Bài đăng của tôi</h1>

          {myPosts.length > 0 ? (
            <div className={styles.postList}>
              {myPosts.map((post) => (
                <article key={post.id} className={styles.postCard}>
                  <img
                    src={post.images[0] ?? "https://via.placeholder.com/100"}
                    alt={post.title}
                    className={styles.postImage}
                    loading="lazy"
                  />
                  <div className={styles.postContent}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <div className={styles.postMeta}>
                      <span>{formatPrice(post.price)}</span> •{" "}
                      <span>{post.areaM2} m²</span>
                    </div>
                    <div className={styles.postActions}>
                      <button className={styles.actionBtn}>Sửa</button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>Bạn chưa có bài đăng nào.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Sell;
