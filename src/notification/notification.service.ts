import { Injectable } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationsGateway: NotificationGateway) {}

  async notifyNewPost(userId: string, post: any) {
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

  async notifyNewComment(userId: string, comment: any) {
    const notification = {
      type: 'NEW_COMMENT',
      data: {
        postId: comment.post.id,
        commentId: comment.id,
        author: comment.user.name,
      },
    };
    
    // Notify post author
    this.notificationsGateway.sendNotificationToUser(
      comment.post.author.id,
      notification,
    );
  }
}