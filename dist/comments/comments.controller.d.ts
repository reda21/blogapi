import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    findComments(blogId: number): Promise<import("./entities/comment.entity").Comment[]>;
    create(createCommentDto: CreateCommentDto, req: any): Promise<import("./entities/comment.entity").Comment>;
    remove(id: string, req: any): Promise<void>;
}
