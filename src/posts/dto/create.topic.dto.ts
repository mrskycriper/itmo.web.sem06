import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDto {
  @ApiProperty({ example: 'Cake baking', description: 'Topic name' })
  name: string;

  @ApiProperty({
    example: 'Everything you need to know about cakes',
    description: 'Topic description',
    required: false,
  })
  description: string | null;

  @ApiProperty({
    example: '3421',
    description: 'Unique category id this topic is attached to',
  })
  categoryId: number;
}
