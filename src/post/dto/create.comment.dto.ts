import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @MaxLength(300)
  @MinLength(2)
  @ApiProperty({
    example: 'This post is awful',
    description: 'Comment text content',
  })
  readonly content: string;

  @IsNumberString()
  @ApiProperty({ example: '3421', description: 'Author id' })
  readonly userId: number;

  @IsNumberString()
  @ApiProperty({
    example: '3421',
    description: 'Unique post id this comment is referring to',
  })
  readonly postId: number;
}
