import { ApiProperty } from '@nestjs/swagger';

export class EditChatDto {
  @ApiProperty({ example: 'Chat', description: 'Chat name' })
  name: string;

  @ApiProperty({
    example: 'Chat description',
    description: 'Chat description',
    required: false,
  })
  description: string | null;
}
