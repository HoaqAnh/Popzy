import styles from "./Buy.module.css";
import { useMemo, useState } from "react";
import { posts } from "@/mocks/posts";
import { users } from "@/mocks/users";
import {
  SearchHeader,
  type Filters,
} from "@/features/buy/components/SearchHeader";
import { ListingCard } from "@/features/buy/components/ListingCard";

const Buy = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    dealType: "for-sale",
    minPrice: 0,
    maxPrice: Infinity,
    minBeds: 0,
    minBaths: 0,
    homeTypes: [],
  });

  const data = useMemo(() => {
    const text = query.trim().toLowerCase();
    return posts.filter((p) => {
      const okText =
        !text ||
        p.title.toLowerCase().includes(text) ||
        p.address.city.toLowerCase().includes(text) ||
        p.address.district.toLowerCase().includes(text);
      const okPrice =
        p.price >= filters.minPrice && p.price <= filters.maxPrice;
      const okBeds = p.beds >= filters.minBeds;
      const okBaths = p.baths >= filters.minBaths;
      return okText && okPrice && okBeds && okBaths;
    });
  }, [query, filters]);

  return (
    <div className={styles.buyPage}>
      <SearchHeader
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <main className={styles.mainContainer} aria-live="polite">
        {data.map((post) => (
          <ListingCard
            key={post.id}
            post={post}
            user={users.find((u) => u.id === post.userId)!}
          />
        ))}
        {data.length === 0 && (
          <div className={styles.emptyState}>
            Không có kết quả phù hợp. Hãy điều chỉnh bộ lọc.
          </div>
        )}
      </main>
    </div>
  );
};

export default Buy;
