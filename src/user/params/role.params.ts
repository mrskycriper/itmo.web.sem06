import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { RoleEnum } from '../role.enum';

export class RoleParams {
  // @IsNotEmpty()
  @IsEnum(Role)
  @ApiProperty({
    description: 'Users role on a forum',
    enum: Role,
    enumName: 'Role',
  })
  role: Role;
}
