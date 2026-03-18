/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef, type ReactNode } from "react";

import { Client } from "@stomp/stompjs";
import type { WebSocketContextType, WSMessage } from "./WebTypes";
import SockJS from "sockjs-client";



const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const client = useRef<Client | null>(null);
  const groupId = useRef<string | null>(null);

  const connect = (onGroupCreatedCallback?: () => void) => {
  if(client.current?.active) return;

  const socket = new SockJS("/connection");

  const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
  });

 stompClient.onConnect = () => {
  console.log("✅ connected to server");

  // subscribe after connection is established
  const subscription = stompClient.subscribe("/topic/group-created", (message) => {
    console.log("📨 group ID received from server:", message.body);
    if (onGroupCreatedCallback) onGroupCreatedCallback();

    subscription.unsubscribe();
  });
  console.log("subscribed to /topic/group-created");

  // now safe to publish
  stompClient.publish({
    destination: "/group/create",
    body: "frontend-session-id-123",
  });
  console.log("create group fired");
};

  stompClient.onStompError = (frame) => {
    console.error("❌ Broker error:", frame.headers["message"]);
  };

  stompClient.activate();
  client.current = stompClient;
};

  const sendMessage = (payload : WSMessage) => {
    if(client.current && client.current.connected){
      client.current.publish({
        destination: "app/message",
        body: JSON.stringify({
          groupId: groupId.current,
          payload
        }),
      });
    }else{
      console.log("not connected");
    }
  }


  return (
    <WebSocketContext.Provider value={{ client, groupId, connect, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used within a WebSocketProvider");
  return context;
};