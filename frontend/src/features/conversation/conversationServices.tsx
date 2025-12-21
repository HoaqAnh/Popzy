import axiosClient from "@/services/axiosClient";

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
  image: string | null;
  read: boolean;
  createdAt: string;
  sender: User;
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

// Interface for Send Message Request
export interface SendMessageRequest {
  conversationId: number;
  senderId: number;
  content: string;
  image?: string;
}

// Interface for Send Message Response
export interface SendMessageResponse {
  statusCode: number;
  error: null | string;
  message: string;
  data: any; // Có thể là message object hoặc success message
}

export const conversationService = {
  listConversations() {
    return axiosClient.get<ListConversationResponse>("/listConversation");
  },

  // Tạo hoặc lấy conversation với user khác
  createOrGetConversation(otherUserId: number) {
    return axiosClient.get<MessageConversationResponse>(
      `/messageConversation`,
      {
        params: {
          userId: otherUserId,
        },
      }
    );
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
  sendMessage(data: SendMessageRequest) {
    return axiosClient.post<SendMessageResponse>("/sendMessage", data);
  },
};
