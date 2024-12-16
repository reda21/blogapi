import { Post } from "../../blog/entities/post.entity";
import { Comment } from "../../comments/entities/comment.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    posts: Post[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
