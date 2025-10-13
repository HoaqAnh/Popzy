import styles from "./Buy.module.css";
import { posts } from "@/mocks/posts";
import { users } from "@/mocks/users";
import { SearchHeader } from "@/features/buy/components/SearchHeader";
import { ListingCard } from "@/features/buy/components/ListingCard";

const Buy = () => {
  const data = posts;
  return (
    <div className={styles.buyPage}>
      <SearchHeader />
      <main className={styles.mainContainer} aria-live="polite">
        {data.map((post) => (
          <ListingCard
            key={post.id}
            post={post}
            user={users.find((u) => u.id === post.userId)!}
          />
        ))}
        {data.length === 0 && (
          <div className={styles.emptyState}>Không có bài viết phù hợp.</div>
        )}
      </main>
    </div>
  );
};

export default Buy;
