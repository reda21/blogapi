import { BlogService } from "./blog.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createPostDto: CreatePostDto, req: any): Promise<import("./entities/post.entity").Post>;
    findAll(): Promise<import("./entities/post.entity").Post[]>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto, req: any): Promise<import("./entities/post.entity").Post>;
    remove(id: string, req: any): Promise<void>;
}
