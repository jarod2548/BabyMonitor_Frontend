import { Client, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  

connect(): Promise<Client> {
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
    stompClient.onWebSocketError = () => {
    reject(new Error("WebSocket connection failed"));
    };

    stompClient.activate();
    this.client = stompClient;
  });
}

sendHeartbeat<HeartbeatData>(endpoint: string, message?: HeartbeatData) {
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
sendWee<WeeData>(endpoint: string, message?: WeeData) {
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


 subscribe<T>(topic: string, callback: (msg: T) => void) : StompSubscription | undefined 
 { if (!this.client || !this.client.connected) 
  { console.error("❌ WebSocket not connected"); return; 

  } if (this.subscriptions.has(topic)) 
    { this.unsubscribe(topic); } 
    const subscription = this.client.subscribe(topic, (message) => 
      { callback(JSON.parse(message.body)); }); 
    this.subscriptions.set(topic, subscription); 
    return subscription; 
  }
  

  unsubscribe(topic: string) {
    const sub = this.subscriptions.get(topic);
    if (sub) {
      sub.unsubscribe();
      this.subscriptions.delete(topic);
    }
  }

}

// Singleton instance — import this anywhere
export const wsService = new WebSocketService();