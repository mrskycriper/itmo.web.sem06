import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @ApiProperty({
    example: 'Im a teapot',
    description: 'Users biography',
    required: false,
  })
  readonly bio: string;
}
