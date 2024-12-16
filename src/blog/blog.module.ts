import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { BlogService } from "./blog.service";
import { BlogController } from "./blog.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService],
})
export class BlogModule {}
