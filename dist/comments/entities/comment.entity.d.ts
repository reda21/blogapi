import { User } from "../../users/entities/user.entity";
import { Post } from "../../blog/entities/post.entity";
export declare class Comment {
    id: number;
    content: string;
    user: User;
    post: Post;
    createdAt: Date;
    updatedAt: Date;
}
