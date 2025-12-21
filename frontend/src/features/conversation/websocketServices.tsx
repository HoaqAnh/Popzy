import { Client } from "@stomp/stompjs";

// Polyfill cho global (cần cho SockJS)
if (typeof window !== "undefined" && !(window as any).global) {
  (window as any).global = window;
}

export interface MessageResponseDTO {
  id: number;
  conversationId: number;
  senderId: number;
  senderEmail: string;
  content: string;
  image: string | null;
  read: boolean;
  createdAt: string;
}

export interface CreateMessageRequest {
  conversationId: number;
  senderId: number;
  content: string;
  image?: string;
}

class WebSocketService {
  private client: Client | null = null;
  private subscribers: Map<number, any> = new Map();

  // Kết nối WebSocket (không cần authentication)
  connect(baseURL: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      // Dynamic import SockJS để tránh SSR issues
      const SockJS = (await import("sockjs-client")).default;

      const socketFactory = () => {
        const socket = new SockJS(`${baseURL}/ws`, null, {
          timeout: 10000,
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
        });
        return socket;
      };

      this.client = new Client({
        webSocketFactory: socketFactory as any,

        debug: (str) => {
          console.log("STOMP Debug:", str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log("WebSocket Connected");
          resolve();
        },
        onStompError: (frame) => {
          console.error("STOMP Error:", frame);
          reject(new Error("WebSocket connection failed"));
        },
        onWebSocketClose: () => {
          console.log("WebSocket Closed");
        },
        onWebSocketError: (error) => {
          console.error("WebSocket Error:", error);
        },
      });

      this.client.activate();
    });
  }

  // Ngắt kết nối
  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.subscribers.clear();
    }
  }

  // Subscribe vào một conversation
  subscribeToConversation(
    conversationId: number,
    callback: (message: MessageResponseDTO) => void
  ) {
    if (!this.client || !this.client.connected) {
      console.error("WebSocket not connected");
      return;
    }

    // Unsubscribe nếu đã subscribe trước đó
    if (this.subscribers.has(conversationId)) {
      this.subscribers.get(conversationId).unsubscribe();
    }

    // Subscribe vào topic của conversation
    const subscription = this.client.subscribe(
      `/topic/conversations.${conversationId}`,
      (message) => {
        try {
          console.log("Raw WebSocket message:", message.body); // Debug log
          const parsedMessage: MessageResponseDTO = JSON.parse(message.body);
          console.log("Parsed WebSocket message:", parsedMessage); // Debug log
          callback(parsedMessage);
        } catch (error) {
          console.error("Error parsing message:", error, message.body);
        }
      }
    );

    this.subscribers.set(conversationId, subscription);
  }

  // Unsubscribe khỏi conversation
  unsubscribeFromConversation(conversationId: number) {
    const subscription = this.subscribers.get(conversationId);
    if (subscription) {
      subscription.unsubscribe();
      this.subscribers.delete(conversationId);
    }
  }

  // Gửi tin nhắn
  sendMessage(request: CreateMessageRequest) {
    if (!this.client || !this.client.connected) {
      console.error("WebSocket not connected");
      throw new Error("WebSocket not connected");
    }

    this.client.publish({
      destination: `/app/conversations/${request.conversationId}/send`,
      body: JSON.stringify({
        senderId: request.senderId,
        content: request.content,
        image: request.image || null,
      }),
    });
  }

  // Kiểm tra trạng thái kết nối
  isConnected(): boolean {
    return this.client ? this.client.connected : false;
  }
}

// Export singleton instance
export const webSocketService = new WebSocketService();
