import { IsInt, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserIdParams {
  @ApiProperty({ example: '3421', description: 'Users unique id' })
  @IsNumberString()
  userId: number;
}
