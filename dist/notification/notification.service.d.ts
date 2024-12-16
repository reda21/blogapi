import { NotificationGateway } from './notification.gateway';
export declare class NotificationService {
    private readonly notificationsGateway;
    constructor(notificationsGateway: NotificationGateway);
    notifyNewPost(userId: string, post: any): Promise<void>;
    notifyNewComment(userId: string, comment: any): Promise<void>;
}
