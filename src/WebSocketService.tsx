import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export class WebSocketService {
  private client: Client | null = null;
  

  connect(onConnected?: () => void) {
    if (this.client?.active) this.client.deactivate();

    const socket = new SockJS("/connection");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log("✅ connected to server");
      if(onConnected) onConnected();
    };

    stompClient.onStompError = (frame) => {
      console.error("❌ Broker error:", frame.headers["message"]);
    };

    stompClient.activate();
    this.client = stompClient;
  }
}

// Singleton instance — import this anywhere
export const wsService = new WebSocketService();