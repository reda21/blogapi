"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
let NotificationGateway = NotificationGateway_1 = class NotificationGateway {
    constructor() {
        this.logger = new common_1.Logger(NotificationGateway_1.name);
        this.connectedClients = new Map();
    }
    handleConnection(client) {
        const userId = this.getUserIdFromToken(client);
        if (userId) {
            this.connectedClients.set(userId, client);
            this.logger.log(`Client connected: ${userId}`);
        }
    }
    handleTest(client, payload) {
        var _a;
        const message = (_a = payload === null || payload === void 0 ? void 0 : payload.message) !== null && _a !== void 0 ? _a : "default message";
        console.info("message subscribe", message, payload);
    }
    handleDisconnect(client) {
        const userId = this.getUserIdFromToken(client);
        if (userId) {
            this.connectedClients.delete(userId);
            this.logger.log(`Client disconnected: ${userId}`);
        }
    }
    handleSubscribe(client, payload) {
        client.join(`user_${payload.userId}`);
        return {
            event: "subscribed",
            data: `Subscribed to user_${payload.userId}`,
        };
    }
    getUserIdFromToken(client) {
        const token = client.handshake.auth.token;
        if (!token)
            return null;
        try {
            return "mock_user_id";
        }
        catch (error) {
            return null;
        }
    }
    sendNotificationToUser(userId, notification) {
        this.server.to(`user_${userId}`).emit("notification", notification);
    }
    broadcastNotification(notification) {
        this.server.emit("notification", notification);
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("test"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleTest", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("subscribe"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], NotificationGateway.prototype, "handleSubscribe", null);
exports.NotificationGateway = NotificationGateway = NotificationGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
        },
    })
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map