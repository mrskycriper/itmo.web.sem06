import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EditPostDto {
  @MaxLength(64)
  @MinLength(2)
  @ApiProperty({ example: 'My first post here', description: 'Post title' })
  readonly title: string;

  @MaxLength(1000)
  @ApiProperty({
    example: 'Hello OpenForum!',
    description: 'Post text content',
  })
  readonly content: string;

  @IsBoolean()
  @ApiProperty({
    example: 'true',
    description: 'Marks if post is publicly visible',
  })
  readonly published: boolean;

  @IsNumberString()
  @ApiProperty({ example: '3421', description: 'Author id' })
  readonly userId: number;

  @IsNumberString()
  @ApiProperty({
    example: '3421',
    description: 'Unique topic id this post is attached to',
  })
  readonly topicId: number;
}
