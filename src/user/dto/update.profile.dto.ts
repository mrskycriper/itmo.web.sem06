import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MaxLength(1000)
  @ApiProperty({
    example: 'Im a teapot',
    description: 'Users biography',
    required: false,
  })
  readonly bio: string;
}
