import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
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
