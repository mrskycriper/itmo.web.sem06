import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 'Super chat', description: 'Chat name' })
  name: string;

  @ApiProperty({
    example: 'This chat is super',
    description: 'Chat description',
    required: false,
  })
  description: string | null;
}
