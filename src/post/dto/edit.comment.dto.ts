import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class EditCommentDto {
  @MaxLength(300)
  @MinLength(2)
  @ApiProperty({
    example: 'This post is awful',
    description: 'Comment text content',
  })
  readonly content: string;
}
