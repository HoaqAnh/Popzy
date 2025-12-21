import axiosClient from "@/services/axiosClient";

// Interface for the conversation item
export interface Conversation {
  conversationId: number;
  otherUserId: number;
  otherUserName: string;
  otherUserAvatar: string | null;
  lastMessage: string;
  lastMessageTime: string;
}

// Interface for the API response
export interface ListConversationResponse {
  statusCode: number;
  error: null | string;
  message: string;
  data: Conversation[];
}

// Interface for User
export interface User {
  id: number;
  email: string;
  fullname: string;
  imageUrl: string | null;
}

// Interface for Message
export interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  image: null | string;
  sender: User;
  receiver: User;
  read: boolean;
}

// Interface for Conversation Detail
export interface ConversationDetail {
  id: number;
  createdAt: string;
  updatedAt: string;
  user1: User;
  user2: User;
  messages: Message[];
}

// Interface for Message API Response
export interface MessageConversationResponse {
  statusCode: number;
  error: null | string;
  message: string;
  data: ConversationDetail;
}

export const conversationService = {
  listConversations() {
    return axiosClient.get<ListConversationResponse>("/listConversation");
  },
};

export const messageService = {
  getMessages(otherUserId: number) {
    return axiosClient.get<MessageConversationResponse>(
      `/messageConversation`,
      {
        params: {
          emailRq: `user${otherUserId}@example.com`, // Thay đổi logic này theo email thực tế
        },
      }
    );
  },

  // Hoặc nếu bạn muốn truyền email trực tiếp
  getMessagesByEmail(id: number) {
    return axiosClient.get<MessageConversationResponse>(
      `/messageConversation`,
      {
        params: {
          userId: id,
        },
      }
    );
  },
};
