import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./my-posts.module.css";
import { SearchIcon, AddIcon } from "@/components/common/icon";
import MyListingCard from "@/features/profile/components/MyListingCard";
import { useMyPosts } from "@/features/profile/hooks/useMyPosts";

const MyPostsPage = () => {
  const { posts, isLoading, error, deletePost } = useMyPosts();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: number) => {
    const result = await deletePost(id);
    if (!result.success) {
      alert(result.message);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h1>Quản lý tin đăng</h1>
          <p className={styles.subtitle}>
            Xem và quản lý tất cả các bất động sản bạn đang rao bán tại một nơi.
          </p>
        </div>
        <Link to="/sell/create" className={styles.newPostBtn}>
          <AddIcon /> Đăng tin mới
        </Link>
      </header>

      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề tin đăng..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.list}>
        {isLoading && (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--muted-foreground)" }}>
            Đang tải dữ liệu...
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--destructive)" }}>
            Lỗi: {error}
          </div>
        )}

        {!isLoading && !error && filteredPosts.length > 0
          ? filteredPosts.map((post) => (
              <MyListingCard key={post.id} post={post} onDelete={handleDelete} />
            ))
          : !isLoading &&
            !error && (
              <div className={styles.emptyState}>
                <p>Không tìm thấy tin đăng nào.</p>
              </div>
            )}
      </div>
    </div>
  );
};

export default MyPostsPage;
