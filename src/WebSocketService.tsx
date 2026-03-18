import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { WSMessage } from "./WebTypes";

export class WebSocketService {
  private client: Client | null = null;
  private sessionId : string | null = null;
  

  connect(onConnected?: (groupId: string) => void) {
    if (this.client?.active) this.client.deactivate();

    const socket = new SockJS("/connection");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log("✅ connected to server");

      const subscription = stompClient.subscribe("/topic/session", (msg) => {
        this.sessionId = msg.body;
        if (onConnected) onConnected(this.sessionId);
        subscription.unsubscribe();
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("❌ Broker error:", frame.headers["message"]);
    };

    stompClient.activate();
    this.client = stompClient;
  }

  sendMessage(destination: string, payload: WSMessage, GroupId: string) {
    if (this.client?.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify({ groupId: GroupId, payload }),
      });
    } else {
      console.warn("❌ WebSocket not connected yet");
    }
  }
}

// Singleton instance — import this anywhere
export const wsService = new WebSocketService();