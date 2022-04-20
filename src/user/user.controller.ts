import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateProfileDto } from './dto/update.profile.dto';
import { TimerInterceptor } from '../timer-interceptor.service';

@ApiTags('user')
@UseInterceptors(TimerInterceptor)
@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User created.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Render users profile' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'Unique user identifier',
  })
  @ApiOkResponse({ description: 'User found.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get('user/:userId/profile')
  @Render('user-profile')
  async getUserProfile(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<object> {
    return await this.usersService.getUserProfile(+userId);
  }

  @ApiOperation({ summary: 'Update user data' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'Unique user identifier',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'User data updated successfully.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Put('user/:userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(+userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Change user role flags' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'Unique user identifier',
  })
  @ApiQuery({
    name: 'isModerator',
    type: 'boolean',
    description: 'Moderator role flag',
  })
  @ApiQuery({
    name: 'isAdmin',
    type: 'boolean',
    description: 'Admin role flag',
  })
  @ApiOkResponse({ description: 'User role updated.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Put('user/:userId/role')
  async updateRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('isModerator', ParseBoolPipe) isModerator: boolean,
    @Query('isAdmin', ParseBoolPipe) isAdmin: boolean,
  ) {
    return await this.usersService.updateRole(userId, isModerator, isAdmin);
  }

  @ApiOperation({ summary: 'Update users profile data' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'Unique user identifier',
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiOkResponse({ description: 'Profile updated.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Put('user/:userId/profile')
  async updateProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.usersService.updateProfile(+userId, updateProfileDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'Unique user identifier',
  })
  @ApiOkResponse({ description: 'User deleted.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden operation.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Delete('user/:userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.deleteUser(+userId);
  }

  @ApiOperation({ summary: 'Render login page' })
  @ApiOkResponse({ description: 'Login page rendered.' })
  @Get('/login')
  @Render('login')
  async renderLogin() {
    return await this.usersService.getLogin();
  }

  @ApiOperation({ summary: 'Log in as user' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Logged in.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }

  @ApiOperation({ summary: 'Log out of user' })
  @ApiOkResponse({ description: 'Logged out.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @Post('/logout')
  async logout() {
    return await this.usersService.logout();
  }
}
