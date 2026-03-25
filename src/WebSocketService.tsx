import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export class WebSocketService {
  private client: Client | null = null;
  

connect() {
  return new Promise((resolve, reject) => {
    if (this.client?.active) this.client.deactivate();

    const socket = new SockJS("/connection");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log("✅ connected to server");
      resolve(stompClient); 
    };

    stompClient.onStompError = (frame) => {
      console.error("❌ Broker error:", frame.headers["message"]);
      reject(new Error(frame.headers["message"]));
    };

    stompClient.activate();
    this.client = stompClient;
  });
}

sendMessage<T>(endpoint: string, message: T) {
  if (!this.client || !this.client.connected) {
    console.error("❌ WebSocket not connected. Cannot send message.");
    return;
  }

  this.client.publish({
  destination: endpoint,
  body: JSON.stringify(message),
  headers: {} // optional
});
  console.log(`🟢 Message sent to ${endpoint}:`, message);
}

subscribe<T>(topic: string, callback: (msg: T) => void) {
    if (!this.client || !this.client.connected) {
      console.error("❌ WebSocket not connected");
      return;
    }

    return this.client.subscribe(topic, (message) => {
      callback(JSON.parse(message.body));
    });
  }


}





// Singleton instance — import this anywhere
export const wsService = new WebSocketService();