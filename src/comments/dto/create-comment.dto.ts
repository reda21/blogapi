import { IsString, MinLength, IsNumber } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsNumber()
  postId: number;
}
