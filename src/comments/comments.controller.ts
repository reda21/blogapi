import { Controller, Post, Body, Param, Delete, UseGuards, Request, Get, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/blog/:blog_id/comments')
  findComments(@Param('blog_id', ParseIntPipe) blogId: number) {
    console.info(`Retrieve comments for blog post with id ${blogId}`);
    return this.commentsService.findMany(blogId);
  }  

  @UseGuards(JwtAuthGuard)
  @Post('/comments')
  create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(createCommentDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/comments/:id')
  remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(+id, req.user);
  }
}