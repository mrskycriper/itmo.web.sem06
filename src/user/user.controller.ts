import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Profile, Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { ProfileEntity } from './entity/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { TimerInterceptor } from '../timer-interceptor.service';
import { IsNumberString } from 'class-validator';
import { UserIdParams } from './params/userid.params';
import { RoleParams } from './params/role.params';
import { RoleEnum } from './role.enum';

@ApiTags('user')
@UseInterceptors(TimerInterceptor)
@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

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
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User was created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiResponse({
    status: 204,
    description: 'User was deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
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
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.deleteUser(+userId);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User data updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Put('user/:userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(+userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Change user role (DOES NO WORK AL ALL!)' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiQuery({ name: 'role', enum: Role })
  @ApiResponse({
    status: 201,
    description: 'User role updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Put('user/:userId/role')
  async updateRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('role') role: Role,
  ) {
    // return await this.usersService.updateRole(+userId, role);
  }

  @ApiOperation({ summary: 'Render users profile' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'User was found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Get('user/:userId/profile')
  @Render('user-profile')
  async getUserProfile(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<object> {
    return await this.usersService.getUserProfile(+userId);
  }

  @ApiOperation({ summary: 'Update users profile data' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({
    status: 201,
    description: 'Profile was updated.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  @Put('user/:userId/profile')
  async updateProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.usersService.updateProfile(+userId, updateProfileDto);
  }

  @ApiOperation({ summary: 'Log in as user' })
  @ApiBody({ type: LoginDto })
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
  async login(@Body() loginDto: LoginDto) {
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
