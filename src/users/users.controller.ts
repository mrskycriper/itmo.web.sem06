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
import { Profile, Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { ProfileEntity } from './entity/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Render login page' })
  @ApiResponse({
    status: 200,
    description: 'Login page rendered.',
  })
  @Get('/login')
  @Render('login')
  async renderLogin() {
    return await this.usersService.getLogin();
  }

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
  @Post('user')
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
  @Delete('user/:userId')
  async deleteUser(@Param('userId') userId: number) {
    return await this.usersService.deleteUser(userId);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiParam({ name: 'updateUserDto', type: 'UpdateUserDto' })
  @ApiResponse({
    status: 201,
    description: 'User data updated successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Post('user/:userId/update')
  async updateUser(@Body('updateUserDto') updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(updateUserDto);
  }

  @ApiOperation({ summary: 'Change user role' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiParam({ name: 'role', type: 'Role' })
  @ApiResponse({
    status: 201,
    description: 'User role updated.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Post('user/:userId/role')
  async updateRole(@Param('userId') userId: number, @Param('role') role: Role) {
    return await this.usersService.updateRole(userId, role);
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
  @Get('user/:userId/profile')
  @Render('user-profile')
  async getUserProfile(@Param('userId') userId: number): Promise<object> {
    return await this.usersService.getUserProfile(userId);
  }

  @ApiOperation({ summary: 'Update users profile data' })
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
  @Post('user/:userId/profile')
  async changeBio(
    @Body('updateProfileDto') updateProfileDto: UpdateProfileDto,
  ) {
    return await this.usersService.updateBio(updateProfileDto);
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
  @Post('user/login')
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
    description: 'Bad request.',
  })
  @Post('user/logout')
  async logout() {
    return await this.usersService.logout();
  }
}
