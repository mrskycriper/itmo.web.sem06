import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Profile } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { ProfileEntity } from './entity/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiParam({ name: 'createUserDto', type: 'CreateUserDto' })
  @ApiResponse({
    status: 201,
    description: 'User was created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Nickname occupied.',
  })
  @Post('create')
  async createUser(@Body('createUserDto') createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'User was deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden operation.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    return await this.usersService.deleteUser(userId);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiParam({ name: 'updateUserDto', type: 'UpdateUserDto' })
  @ApiResponse({
    status: 201,
    description: 'User data updated successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied.',
  })
  @Post(':userId/update')
  async updateUser(
    @Param('userId') userId: number,
    @Body('updateUserDto') updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Render users profile' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'User was found.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Get(':userId/profile')
  @Render('user-profile')
  async getUserProfile(@Param('userId') userId: number): Promise<object> {
    return await this.usersService.getUserProfile(userId);
  }

  @ApiOperation({ summary: 'Update users profile data' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiParam({ name: 'updateProfileDto', type: 'UpdateProfileDto' })
  @ApiResponse({
    status: 201,
    description: 'Bio was updated.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Post(':userId/profile/bio')
  async changeBio(
    @Param('userId') userId: number,
    @Body('updateProfileDto') updateProfileDto: UpdateProfileDto,
  ) {
    return await this.usersService.updateBio(userId, updateProfileDto);
  }

  @ApiOperation({ summary: 'Log in as user' })
  @ApiParam({ name: 'loginDto', type: 'LoginDto' })
  @ApiResponse({
    status: 200,
    description: 'Logged in.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Post('login')
  async login(@Body('loginDto') loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }

  @ApiOperation({ summary: 'Log out of user' })
  @ApiResponse({
    status: 200,
    description: 'Logged out.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bat request.',
  })
  @Post('logout')
  async logout() {
    return await this.usersService.logout();
  }
}
