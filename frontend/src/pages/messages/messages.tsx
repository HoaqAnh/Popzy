import { useState } from "react";
import styles from "./messages.module.css";
import { conversations, messages } from "@/mocks/messages";
import { users } from "@/mocks/users";

// type Message = {
//   id: string;
//   senderId: string;
//   text: string;
//   timestamp: string;
// };
// type Conversation = {
//   id: string;
//   userId: string;
//   name: string;
//   lastMessage: string;
//   timestamp: string;
// };

const MessagesPage = () => {
  const [activeConvoId, setActiveConvoId] = useState<string>("c1");
  const activeMessages = messages[activeConvoId as keyof typeof messages] || [];
  const activeConvo = conversations.find((c) => c.id === activeConvoId);
  const activeUser = users.find((u) => u.id === activeConvo?.userId);

  return (
    <div className={styles.page}>
      {/* ===== DANH SÁCH HỘI THOẠI ===== */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Tin nhắn</h2>
        </div>
        <div className={styles.convoList}>
          {conversations.map((convo) => (
            <div
              key={convo.id}
              className={`${styles.convoItem} ${
                convo.id === activeConvoId ? styles.active : ""
              }`}
              onClick={() => setActiveConvoId(convo.id)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.avatar}>
                {convo.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.convoDetails}>
                <span className={styles.convoName}>{convo.name}</span>
                <span className={styles.convoLastMsg}>{convo.lastMessage}</span>
              </div>
              <span className={styles.convoTime}>{convo.timestamp}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ===== KHUNG CHAT CHÍNH ===== */}
      <main className={styles.chatArea}>
        {activeConvo && activeUser ? (
          <>
            {/* Header của khung chat */}
            <header className={styles.chatHeader}>
              <div className={styles.avatar}>
                {activeUser.fullname.charAt(0).toUpperCase()}
              </div>
              <h3>{activeUser.fullname}</h3>
            </header>

            {/* Danh sách tin nhắn */}
            <div className={styles.messageList}>
              {activeMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageBubble} ${
                    msg.senderId === "me" ? styles.sent : styles.received
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={styles.timestamp}>{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Khung nhập tin nhắn */}
            <footer className={styles.messageInput}>
              <input type="text" placeholder="Nhập tin nhắn..." />
              <button>Gửi</button>
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
