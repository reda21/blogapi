import { User } from "../../users/entities/user.entity";
import { Comment } from "../../comments/entities/comment.entity";
export declare class Post {
    id: number;
    title: string;
    content: string;
    author: User;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
