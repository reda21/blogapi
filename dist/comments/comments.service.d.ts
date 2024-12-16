import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { User } from "../users/entities/user.entity";
import { BlogService } from "../blog/blog.service";
export declare class CommentsService {
    private commentsRepository;
    private blogService;
    constructor(commentsRepository: Repository<Comment>, blogService: BlogService);
    create(createCommentDto: CreateCommentDto, user: User): Promise<Comment>;
    findMany(blogId: number): Promise<Comment[]>;
    findOne(id: number): Promise<Comment>;
    remove(id: number, user: User): Promise<void>;
}
