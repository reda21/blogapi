import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.blogService.create(createPostDto, req.user);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req
  ) {
    return this.blogService.update(+id, updatePostDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Request() req) {
    return this.blogService.remove(+id, req.user);
  }
}
