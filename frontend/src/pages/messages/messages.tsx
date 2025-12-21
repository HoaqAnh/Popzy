import { useState, useEffect, useRef } from "react";
import styles from "./messages.module.css";
import {
  conversationService,
  messageService,
} from "@/features/conversation/conversationServices";
import type { Conversation } from "@/features/conversation/conversationServices";
import { webSocketService } from "@/features/conversation/websocketServices";
import type { MessageResponseDTO } from "@/features/conversation/websocketServices";

type DisplayMessage = {
  id: string;
  senderId: string;
  text: string;
  image: string | null;
  timestamp: string;
  read: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const MessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeConvoId, setActiveConvoId] = useState<number | null>(null);
  const [activeMessages, setActiveMessages] = useState<DisplayMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [wsConnected, setWsConnected] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);

  // Khởi tạo WebSocket connection
  useEffect(() => {
    const initWebSocket = async () => {
      try {
        console.log("Initializing WebSocket connection...");
        await webSocketService.connect(BASE_URL);
        setWsConnected(true);
        console.log("✅ WebSocket connected successfully");
      } catch (error) {
        console.error("❌ Failed to connect WebSocket:", error);
        setWsConnected(false);

        // Thử kết nối lại sau 5 giây
        setTimeout(() => {
          console.log("Retrying WebSocket connection...");
          initWebSocket();
        }, 5000);
      }
    };

    // Delay một chút để đảm bảo component đã mount
    const timer = setTimeout(() => {
      initWebSocket();
    }, 500);

    return () => {
      clearTimeout(timer);
      webSocketService.disconnect();
    };
  }, []);

  // Fetch danh sách conversations khi component mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await conversationService.listConversations();

        if (response.data.statusCode === 200 && response.data.data) {
          setConversations(response.data.data);

          // Tự động chọn conversation đầu tiên nếu có
          if (response.data.data.length > 0) {
            setActiveConvoId(response.data.data[0].conversationId);
          }
        } else {
          setError(
            response.data.message || "Không thể tải danh sách hội thoại"
          );
        }
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setError("Đã xảy ra lỗi khi tải danh sách hội thoại");
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages và subscribe WebSocket khi chọn conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (activeConvoId) {
        const activeConvo = conversations.find(
          (c) => c.conversationId === activeConvoId
        );
        if (!activeConvo) return;

        try {
          setLoadingMessages(true);
          const response = await messageService.getMessagesByEmail(
            activeConvo.otherUserId
          );

          if (response.data.statusCode === 200 && response.data.data) {
            const conversationData = response.data.data;

            // Xác định current user ID
            const currentUser =
              conversationData.user1.id === activeConvo.otherUserId
                ? conversationData.user2
                : conversationData.user1;

            setCurrentUserId(currentUser.id);

            // Convert API messages sang format hiển thị
            const messages = conversationData.messages.map((msg) => ({
              id: msg.id.toString(),
              senderId: msg.sender.id === currentUser.id ? "me" : "other",
              text: msg.content,
              image: msg.image,
              timestamp: formatTime(msg.createdAt),
              read: msg.read,
            }));

            setActiveMessages(messages);
          }
        } catch (err) {
          console.error("Error fetching messages:", err);
          setActiveMessages([]);
        } finally {
          setLoadingMessages(false);
        }
      }
    };

    fetchMessages();

    // Subscribe vào WebSocket topic cho conversation này
    if (activeConvoId && wsConnected) {
      webSocketService.subscribeToConversation(activeConvoId, handleNewMessage);

      return () => {
        webSocketService.unsubscribeFromConversation(activeConvoId);
      };
    }
  }, [activeConvoId, conversations, wsConnected]);

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [activeMessages]);

  // Xử lý tin nhắn mới từ WebSocket
  const handleNewMessage = (message: MessageResponseDTO) => {
    console.log("Received WebSocket message:", message); // Debug log

    if (!message || !message.senderId) {
      console.error("Invalid message structure:", message);
      return;
    }

    const newMessage: DisplayMessage = {
      id: message.id.toString(),
      senderId: message.senderId === currentUserId ? "me" : "other",
      text: message.content,
      image: message.image,
      timestamp: formatTime(message.createdAt),
      read: message.read,
    };

    setActiveMessages((prev) => [...prev, newMessage]);

    // Cập nhật lastMessage trong danh sách conversations
    setConversations((prev) =>
      prev.map((conv) =>
        conv.conversationId === activeConvoId
          ? {
              ...conv,
              lastMessage: message.content,
              lastMessageTime: message.createdAt,
            }
          : conv
      )
    );
  };

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (
      !messageInput.trim() ||
      !activeConvoId ||
      !currentUserId ||
      !wsConnected
    ) {
      return;
    }

    try {
      webSocketService.sendMessage({
        conversationId: activeConvoId,
        senderId: currentUserId,
        content: messageInput.trim(),
        image: undefined,
      });

      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Không thể gửi tin nhắn. Vui lòng thử lại.");
    }
  };

  // Xử lý nhấn Enter để gửi tin nhắn
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const activeConvo = conversations.find(
    (c) => c.conversationId === activeConvoId
  );

  // Format thời gian
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ===== DANH SÁCH HỘI THOẠI ===== */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Tin nhắn</h2>
          {!wsConnected && (
            <span style={{ fontSize: "12px", color: "#f44336" }}>
              ● Không kết nối
            </span>
          )}
        </div>
        <div className={styles.convoList}>
          {conversations.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Chưa có cuộc hội thoại nào</p>
            </div>
          ) : (
            conversations.map((convo) => (
              <div
                key={convo.conversationId}
                className={`${styles.convoItem} ${
                  convo.conversationId === activeConvoId ? styles.active : ""
                }`}
                onClick={() => setActiveConvoId(convo.conversationId)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.avatar}>
                  {convo.otherUserAvatar ? (
                    <img
                      src={convo.otherUserAvatar}
                      alt={convo.otherUserName}
                    />
                  ) : (
                    convo.otherUserName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className={styles.convoDetails}>
                  <span className={styles.convoName}>
                    {convo.otherUserName}
                  </span>
                  <span className={styles.convoLastMsg}>
                    {convo.lastMessage}
                  </span>
                </div>
                <span className={styles.convoTime}>
                  {formatTime(convo.lastMessageTime)}
                </span>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* ===== KHUNG CHAT CHÍNH ===== */}
      <main className={styles.chatArea}>
        {activeConvo ? (
          <>
            {/* Header của khung chat */}
            <header className={styles.chatHeader}>
              <div className={styles.avatar}>
                {activeConvo.otherUserAvatar ? (
                  <img
                    src={activeConvo.otherUserAvatar}
                    alt={activeConvo.otherUserName}
                  />
                ) : (
                  activeConvo.otherUserName.charAt(0).toUpperCase()
                )}
              </div>
              <h3>{activeConvo.otherUserName}</h3>
              {wsConnected && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#4caf50",
                    marginLeft: "auto",
                  }}
                >
                  ● Online
                </span>
              )}
            </header>

            {/* Danh sách tin nhắn */}
            <div className={styles.messageList} ref={messageListRef}>
              {loadingMessages ? (
                <div className={styles.emptyState}>
                  <p>Đang tải tin nhắn...</p>
                </div>
              ) : activeMessages.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Chưa có tin nhắn nào</p>
                </div>
              ) : (
                activeMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${styles.messageBubble} ${
                      msg.senderId === "me" ? styles.sent : styles.received
                    }`}
                  >
                    {msg.image && msg.image !== "abc" && (
                      <img
                        src={msg.image}
                        alt="Hình ảnh"
                        style={{
                          maxWidth: "200px",
                          borderRadius: "8px",
                          marginBottom: "4px",
                        }}
                      />
                    )}
                    <p>{msg.text}</p>
                    <span className={styles.timestamp}>{msg.timestamp}</span>
                  </div>
                ))
              )}
            </div>

            {/* Khung nhập tin nhắn */}
            <footer className={styles.messageInput}>
              <input
                type="text"
                placeholder={
                  wsConnected ? "Nhập tin nhắn..." : "Đang kết nối..."
                }
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!wsConnected}
              />
              <button
                onClick={handleSendMessage}
                disabled={!wsConnected || !messageInput.trim()}
              >
                Gửi
              </button>
            </footer>
          </>
        ) : (
          <div className={styles.emptyState}>
            <p>Chọn một cuộc hội thoại để bắt đầu.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MessagesPage;
