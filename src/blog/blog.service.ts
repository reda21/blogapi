import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      author: user,
    });
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ["author", "comments", "comments.user"],
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ["author", "comments", "comments.user"],
    });
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    user: User
  ): Promise<Post> {
    const post = await this.findOne(id);
    if (post.author.id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.postsRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number, user: User): Promise<void> {
    const post = await this.findOne(id);
    if (post.author.id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.postsRepository.delete(id);
  }
}
