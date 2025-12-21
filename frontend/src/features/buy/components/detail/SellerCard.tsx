import { useEffect, useState } from "react";
import { getAvatarLabel } from "@/utils/format";
import type { User } from "@/types/realestate";
import styles from "./SellerCard.module.css";
import { ContactIcon, LikeIcon, HeartRedIcon } from "@/components/common/icon";
import {
  conversationService,
  messageService,
} from "@/features/conversation/conversationServices";
import { favoriteService } from "@/features/favorite/favoriteService";

interface SellerCardProps {
  user: User;
  postId: number;
  postTitle?: string;
  postUrl?: string;
}

const SellerCard = ({ user, postTitle, postUrl, postId }: SellerCardProps) => {
  const [isContacting, setIsContacting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  useEffect(() => {
    const checkLiked = async () => {
      const currentUserStr = localStorage.getItem("popzy-user");
      if (!currentUserStr || !postId) return;

      try {
        const res = await favoriteService.checkLiked(postId);
        if (res.data.statusCode === 200) {
          setLiked(res.data.data === true);
        }
      } catch (e) {
        console.error("Check liked failed", e);
      }
    };

    checkLiked();
  }, [postId]);

  const handleContact = async () => {
    try {
      setIsContacting(true);
      setError(null);

      // Bước 1: Lấy thông tin current user từ localStorage hoặc context
      const currentUserStr = localStorage.getItem("popzy-user");
      if (!currentUserStr) {
        alert("Vui lòng đăng nhập để liên hệ!");
        window.location.href = "/login";
        return;
      }

      const currentUser = JSON.parse(currentUserStr);

      // Kiểm tra không tự liên hệ với chính mình
      if (currentUser.email === user.email) {
        alert("Bạn không thể liên hệ với chính mình!");
        return;
      }

      // Bước 2: Tạo hoặc lấy conversation
      const conversationResponse =
        await conversationService.createOrGetConversation(user.id);

      if (conversationResponse.data.statusCode !== 200) {
        throw new Error(
          conversationResponse.data.message || "Không thể tạo cuộc hội thoại"
        );
      }

      const conversation = conversationResponse.data.data;
      const conversationId = conversation.id;

      // Bước 3: Tạo nội dung tin nhắn
      const messageContent = postUrl
        ? `Xin chào! Tôi quan tâm đến bài đăng: ${postUrl}`
        : postTitle
        ? `Xin chào! Tôi quan tâm đến bài đăng: ${postTitle}`
        : "Xin chào! Tôi quan tâm đến bài đăng của bạn.";

      // Bước 4: Gửi tin nhắn
      const sendMessageResponse = await messageService.sendMessage({
        conversationId: conversationId,
        senderId: currentUser.id,
        content: messageContent,
        image: undefined,
      });

      if (sendMessageResponse.data.statusCode !== 200) {
        throw new Error(
          sendMessageResponse.data.message || "Không thể gửi tin nhắn"
        );
      }

      // Bước 5: Chuyển hướng đến trang tin nhắn
      alert("Đã gửi tin nhắn thành công!");
      window.location.href = "/messages";
    } catch (err: any) {
      console.error("Error contacting seller:", err);
      setError(err.message || "Đã xảy ra lỗi khi liên hệ");
      alert(err.message || "Không thể liên hệ. Vui lòng thử lại sau.");
    } finally {
      setIsContacting(false);
    }
  };

  const handleLike = async () => {
    try {
      setLikeLoading(true);

      if (!liked) {
        await favoriteService.likePost(postId);
        setLiked(true);
      } else {
        await favoriteService.unlikePost(postId);
        setLiked(false);
      }
    } catch {
      alert("Không thể cập nhật yêu thích");
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div className={styles.sellerCard}>
      <div className={styles.sellerHeader}>
        {(user.imageUrl && (
          <img src={user.imageUrl} alt="Avatar" className={styles.avatar} />
        )) || (
          <div className={styles.avatar}>{getAvatarLabel(user.fullname)}</div>
        )}
        <div>
          <div className={styles.sellerName}>{user.fullname}</div>
          <div className={styles.sellerRole}>Môi giới uy tín</div>
        </div>
      </div>

      {error && (
        <div style={{ color: "red", fontSize: "14px", marginBottom: "8px" }}>
          {error}
        </div>
      )}

      <div className={styles.contactBtns}>
        <button
          className={`${styles.contactBtn} ${styles.primary}`}
          onClick={handleContact}
          disabled={isContacting}
        >
          <ContactIcon />
          <p>{isContacting ? "Đang xử lý..." : "Liên hệ ngay"}</p>
        </button>
        <button className={styles.contactBtn} onClick={handleLike}>
          {liked ? <HeartRedIcon /> : <LikeIcon />}
          <p>{liked ? "Đã yêu thích" : "Yêu thích bản tin này"}</p>
        </button>
      </div>
    </div>
  );
};

export default SellerCard;
