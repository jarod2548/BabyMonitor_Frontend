import type { Client } from "@stomp/stompjs";

export interface WSMessage<T = unknown> {
  type: string;
  value:  T;
}

export interface WebSocketContextType {
  connect: (onGroupCreatedCallback?: () => void) => void;
  client: React.RefObject<Client | null>;
}
