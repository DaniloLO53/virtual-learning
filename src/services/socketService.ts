import { ClientToServerEvents, ServerToClientEvents } from "@/models/events";
import { io, Socket } from "socket.io-client";

class SocketService {
  private readonly socket: Socket<ServerToClientEvents, ClientToServerEvents> =
    io('http://localhost:5000', {
      autoConnect: false,
    });

  connectWithAuthToken(token: string) {
    this.socket.auth = { token };
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(data: any) {
    console.log('SOCKET', this.socket)
    return this.socket.emit("message", data);
  }


  subscribeToMessages(messageHandler: ServerToClientEvents["message"]) {
    this.socket.on("message", messageHandler);
  }
}

export const socketService = new SocketService();