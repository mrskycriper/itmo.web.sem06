import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ example: 'Hello!', description: 'Message text' })
  readonly content: string;

  @IsNumber()
  @ApiProperty({ example: '3421', description: 'Author id' })
  readonly userId: number;

  @IsNumber()
  @ApiProperty({ example: '3421', description: 'Chat id' })
  readonly chatId: number;
}
