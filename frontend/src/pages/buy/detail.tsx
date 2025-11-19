import { useParams, Navigate } from "react-router-dom";
import { posts } from "@/mocks/posts";
import { users } from "@/mocks/users";
import styles from "./detail.module.css";
import HeroGallery from "@/features/buy/components/detail/HeroGallery";
import PropertyHeader from "@/features/buy/components/detail/PropertyHeader";
import AttributeGrid from "@/features/buy/components/detail/AttributeGrid";
import Description from "@/features/buy/components/detail/Description";
import SellerCard from "@/features/buy/components/detail/SellerCard";
import MobileStickyActions from "@/features/buy/components/detail/MobileStickyActions";
import { ListingSidebar } from "@/features/buy/components/ListingSidebar";

const DetailPage = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <Navigate to="/buy" replace />;
  }

  const user = users.find((u) => u.id === post.userId) || {
    id: "unknown",
    name: "Người dùng Popzy",
  };

  return (
    <div className={styles.container}>
      <HeroGallery images={post.images} />

      <div className={styles.contentWrapper}>
        <div className={styles.mainColumn}>
          <PropertyHeader
            title={post.title}
            price={post.price}
            beds={post.beds}
            baths={post.baths}
            area={post.areaM2}
            address={`${post.address.district}, ${post.address.city}`}
          />

          <hr className={styles.divider} />

          <AttributeGrid post={post} />

          <hr className={styles.divider} />

          <Description
            text={post.description}
            createdAt={post.created_at}
            views={post.views}
            likes={post.likes}
          />

          <div className={styles.analysis}>
            <ListingSidebar post={post} />
          </div>
        </div>

        <aside className={styles.sidebarWrapper}>
          <SellerCard user={user} />
        </aside>
      </div>

      <MobileStickyActions />
    </div>
  );
};

export default DetailPage;
