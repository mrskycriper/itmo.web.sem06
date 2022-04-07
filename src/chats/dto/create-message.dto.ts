import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello!', description: 'Message text' })
  content: string;

  @ApiProperty({ example: '3421', description: 'Author id' })
  userId: number;

  @ApiProperty({ example: '3421', description: 'Chat id' })
  chatId: number;
}
