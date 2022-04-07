import { ApiProperty } from '@nestjs/swagger';

export class ProfileEntity {
  @ApiProperty({ example: '3421', description: 'Profile unique id' })
  id: number;

  @ApiProperty({ example: "I'm a teapot", description: 'Users biography' })
  bio: string;

  @ApiProperty({ example: '3421', description: 'Profile owners id' })
  userId: number;
}
