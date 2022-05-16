import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';

export class ReceiveMessageDto {
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ example: 'Hello!', description: 'Message text' })
  readonly content: string;

  @IsNumberString()
  @ApiProperty({ example: '3421', description: 'Chat id' })
  readonly chatId: number;
}
