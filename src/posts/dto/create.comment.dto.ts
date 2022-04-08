import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'This post is awful',
    description: 'Comment text content',
  })
  content: string;

  @ApiProperty({ example: '3421', description: 'Author id' })
  userId: number;

  @ApiProperty({
    example: '3421',
    description: 'Unique post id this comment is referring to',
  })
  postId: number;
}
