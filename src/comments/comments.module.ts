import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { BlogModule } from "../blog/blog.module";

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), BlogModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
