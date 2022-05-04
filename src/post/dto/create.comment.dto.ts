import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @MaxLength(300)
  @MinLength(2)
  @ApiProperty({
    example: 'This post is awful',
    description: 'Comment text content',
  })
  readonly content: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'c7a18e82-6741-4b29-bd58-26a84c5e2088',
    description: 'Author id',
  })
  readonly userId: string;

  @IsNumberString()
  @ApiProperty({
    example: '3421',
    description: 'Unique post id this comment is referring to',
  })
  readonly postId: number;
}
