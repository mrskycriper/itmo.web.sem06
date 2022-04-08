import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ example: "I'm a teapot", description: 'Users biography' })
  bio: string;
}
