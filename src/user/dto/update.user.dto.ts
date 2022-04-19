import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'name',
    description: 'Username',
    required: false,
  })
  readonly name: string;

  @IsEmail()
  @ApiProperty({
    example: 'example@mail.domain',
    description: 'Users email address',
    required: false,
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '34256723476238756823476823',
    description: 'Hashed password',
    required: false,
  })
  readonly passwordHash: string;
}
