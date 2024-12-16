import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private readonly logger;
    private connectedClients;
    handleConnection(client: Socket): void;
    handleTest(client: Socket, payload: {
        message: string | undefined;
    }): void;
    handleDisconnect(client: Socket): void;
    handleSubscribe(client: Socket, payload: {
        userId: string;
    }): {
        event: string;
        data: string;
    };
    private getUserIdFromToken;
    sendNotificationToUser(userId: string, notification: any): void;
    broadcastNotification(notification: any): void;
}
