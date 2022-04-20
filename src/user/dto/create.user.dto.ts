import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(2)
  @ApiProperty({
    example: 'name',
    description: 'Username',
  })
  readonly name: string;

  @IsEmail()
  @ApiProperty({
    example: 'example@mail.domain',
    description: 'Users email address',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '34256723476238756823476823',
    description: 'Hashed password',
  })
  readonly passwordHash: string;
}
