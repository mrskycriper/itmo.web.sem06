import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My first post here', description: 'Post title' })
  title: string;

  @ApiProperty({
    example: 'Hello OpenForum!',
    description: 'Post text content',
  })
  content: string;

  @ApiProperty({
    example: 'true',
    description: 'Marks if post is publicly visible',
  })
  published: boolean;

  @ApiProperty({ example: '3421', description: 'Author id' })
  userId: number;

  @ApiProperty({
    example: '3421',
    description: 'Unique topic id this post is attached to',
  })
  topicId: number;
}
