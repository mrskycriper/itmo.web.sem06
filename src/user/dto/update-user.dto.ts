import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: '3421', description: 'Users unique id' })
  id: number;

  @ApiProperty({
    example: 'name',
    description: 'Username',
  })
  readonly name: string;

  @ApiProperty({
    example: 'example@mail.domain',
    description: 'Users email address',
  })
  readonly email: string;

  @ApiProperty({
    example: '34256723476238756823476823',
    description: 'Hashed password',
  })
  readonly passwordHash: string;
}
