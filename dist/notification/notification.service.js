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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notification_gateway_1 = require("./notification.gateway");
let NotificationService = class NotificationService {
    constructor(notificationsGateway) {
        this.notificationsGateway = notificationsGateway;
    }
    async notifyNewPost(userId, post) {
        const notification = {
            type: 'NEW_POST',
            data: {
                postId: post.id,
                title: post.title,
                author: post.author.name,
            },
        };
        this.notificationsGateway.broadcastNotification(notification);
    }
    async notifyNewComment(userId, comment) {
        const notification = {
            type: 'NEW_COMMENT',
            data: {
                postId: comment.post.id,
                commentId: comment.id,
                author: comment.user.name,
            },
        };
        this.notificationsGateway.sendNotificationToUser(comment.post.author.id, notification);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_gateway_1.NotificationGateway])
], NotificationService);
//# sourceMappingURL=notification.service.js.map