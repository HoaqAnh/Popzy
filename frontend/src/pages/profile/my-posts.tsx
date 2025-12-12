import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./my-posts.module.css";
import { myPosts } from "@/mocks/myPosts"; // Sử dụng mock data có sẵn
import { SearchIcon, AddIcon } from "@/components/common/icon";
import MyListingCard from "@/features/profile/components/MyListingCard";

const MyPostsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic giả lập (chỉ ở phía client cho giao diện)
  const filteredPosts = myPosts.filter((post) =>
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
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <MyListingCard key={post.id} post={post} />)
        ) : (
          <div className={styles.emptyState}>
            <p>Không tìm thấy tin đăng nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostsPage;
