import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationGateway.name);
  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    const userId = this.getUserIdFromToken(client);
    if (userId) {
      this.connectedClients.set(userId, client);
      this.logger.log(`Client connected: ${userId}`);
    }
  }

  @SubscribeMessage("test")
  handleTest(client: Socket, payload: { message: string | undefined }){
      const message = payload?.message ?? "default message";
      console.info("message subscribe", message, payload)
  }

  handleDisconnect(client: Socket) {
    const userId = this.getUserIdFromToken(client);
    if (userId) {
      this.connectedClients.delete(userId);
      this.logger.log(`Client disconnected: ${userId}`);
    }
  }

  @SubscribeMessage("subscribe")
  handleSubscribe(client: Socket, payload: { userId: string }) {
    client.join(`user_${payload.userId}`);
    return {
      event: "subscribed",
      data: `Subscribed to user_${payload.userId}`,
    };
  }

  private getUserIdFromToken(client: Socket): string | null {
    const token = client.handshake.auth.token;
    if (!token) return null;

    try {
      // Here you would normally decode and verify the JWT token
      // For now, we'll just return a mock user ID
      return "mock_user_id";
    } catch (error) {
      return null;
    }
  }

  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user_${userId}`).emit("notification", notification);
  }

  broadcastNotification(notification: any) {
    this.server.emit("notification", notification);
  }
}
