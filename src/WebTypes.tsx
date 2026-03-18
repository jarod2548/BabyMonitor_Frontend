import type { Client } from "@stomp/stompjs";

export interface WSMessage {
  type: string;
  value:  object;
}

export interface WebSocketContextType {
  connect: (onGroupCreatedCallback?: () => void) => void;
  sendMessage: (Destination : string, payload: WSMessage) => void;
  client: React.RefObject<Client | null>;
  groupId: React.RefObject<string | null>;
}
