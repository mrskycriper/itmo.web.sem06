import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({ example: '3421', description: 'Users unique id' })
  id: number;

  @ApiProperty({
    example: 'example@mail.domain',
    description: 'Users email address',
  })
  email: string;

  @ApiProperty({
    example: '34256723476238756823476823',
    description: 'Hashed password',
  })
  passwordHash: string;

  @ApiProperty({
    example: 'Zagos',
    description: 'Unique username',
  })
  name: string;

  @ApiProperty({
    example: 'false',
    description: 'Defines if user has a moderator role',
  })
  isModerator: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Defines if user has an admin role',
  })
  isAdmin: boolean;
}
