import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { User } from "../users/entities/user.entity";
export declare class BlogService {
    private postsRepository;
    constructor(postsRepository: Repository<Post>);
    create(createPostDto: CreatePostDto, user: User): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto, user: User): Promise<Post>;
    remove(id: number, user: User): Promise<void>;
}
