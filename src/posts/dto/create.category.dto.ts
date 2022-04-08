import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Cooking', description: 'Category name' })
  name: string;

  @ApiProperty({
    example: 'Everything about food',
    description: 'Category description',
    required: false,
  })
  description: string | null;
}
