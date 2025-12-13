import { useParams, useNavigate } from "react-router-dom";
import styles from "./detail.module.css";
import HeroGallery from "@/features/buy/components/detail/HeroGallery";
import PropertyHeader from "@/features/buy/components/detail/PropertyHeader";
import AttributeGrid from "@/features/buy/components/detail/AttributeGrid";
import Description from "@/features/buy/components/detail/Description";
import SellerCard from "@/features/buy/components/detail/SellerCard";
import MobileStickyActions from "@/features/buy/components/detail/MobileStickyActions";
import PriceAnalysis from "@/features/buy/components/detail/PriceAnalysis";
import { useGetPostDetail } from "@/features/buy/hooks/useGetPostDetail";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const idParsed = id ? Number(id) : -1;
  const navigate = useNavigate();

  const { post, user, isLoading, error } = useGetPostDetail(idParsed);

  if (isLoading) {
    return (
      <div style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
        Đang tải thông tin chi tiết...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2>Không tìm thấy tin đăng</h2>
        <button
          onClick={() => navigate("/buy")}
          style={{ marginTop: "16px", padding: "8px 16px", cursor: "pointer" }}
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const safeUser = user || {
    id: -1,
    fullname: "Người dùng Popzy",
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200",
    email: "contact@popzy.com",
    phone: "0900000000",
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
            <hr className={styles.divider} />
            <PriceAnalysis post={post} />
          </div>
        </div>

        <aside className={styles.sidebarWrapper}>
          <SellerCard user={safeUser} />
          <PriceAnalysis post={post} />
        </aside>
      </div>

      <MobileStickyActions user={safeUser} />
    </div>
  );
};

export default DetailPage;
