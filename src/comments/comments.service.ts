import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { User } from "../users/entities/user.entity";
import { BlogService } from "../blog/blog.service";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private blogService: BlogService
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: User
  ): Promise<Comment> {
    const post = await this.blogService.findOne(createCommentDto.postId);
    const comment = this.commentsRepository.create({
      content: createCommentDto.content,
      user,
      post,
    });
    return this.commentsRepository.save(comment);
  }

  async findMany (blogId: number): Promise<Comment[]> {
    console.info("blogId", blogId)
    return this.commentsRepository.find({
      where: { post: { id: blogId } },
      relations: ["user", "post"],
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ["user", "post"],
    });
    if (!comment) {
      throw new NotFoundException("Comment not found");
    }
    return comment;
  }

  async remove(id: number, user: User): Promise<void> {
    const comment = await this.findOne(id);
    if (comment.user.id !== user.id) {
      throw new UnauthorizedException();
    }
    await this.commentsRepository.delete(id);
  }
}
