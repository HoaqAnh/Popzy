import styles from "./Buy.module.css";
import SearchHeader from "@/features/buy/components/SearchHeader";
import ListingCard from "@/features/buy/components/ListingCard";
import { useGetPosts } from "@/features/buy/hooks/useGetPosts";

const Buy = () => {
  const { data, isLoading, error } = useGetPosts();

  return (
    <div className={styles.pageWrapper}>
      <SearchHeader />

      <main className={styles.mainContainer} aria-live="polite">
        {isLoading && (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--muted-foreground)" }}>
            Đang tải danh sách bất động sản...
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--destructive)" }}>
            Error: {error}
          </div>
        )}

        {!isLoading &&
          !error &&
          data.map(({ post, user }) => <ListingCard key={post.id} post={post} user={user} />)}

        {!isLoading && !error && data.length === 0 && (
          <div className={styles.emptyState}>Không có bài viết phù hợp.</div>
        )}
      </main>
    </div>
  );
};

export default Buy;
