import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Render,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateProfileDto } from './dto/update.profile.dto';
import { TimerInterceptor } from '../timer-interceptor.service';
import { AuthGuard } from '../auth/auth.guard';
import { SessionDecorator } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { CheckUsernameDto } from './dto/check.username.dto';
import { EditRoleDto } from './dto/edit.role.dto';

@ApiTags('user')
@UseInterceptors(TimerInterceptor)
@ApiCookieAuth()
@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Check if username is already taken' })
  @ApiBody({ type: CheckUsernameDto })
  @ApiOkResponse({ description: 'Ok.' })
  @Post('checkname')
  async isUsernameTaken(
    @Body() checkUsernameDto: CheckUsernameDto,
  ): Promise<object> {
    return await this.usersService.isUsernameTaken(checkUsernameDto.name);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'Created.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiParam({
    name: 'userName',
    type: 'string',
    description: 'Unique user name',
  })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Get('user/:userName')
  @Render('user-profile')
  async getUserProfile(
    @SessionDecorator() session: SessionContainer,
    @Param('userName') userName: string,
  ): Promise<object> {
    let userId = null;
    try {
      userId = session.getUserId();
    } catch (err) {}
    return await this.usersService.getUserProfile(userId, userName);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Change user role flags' })
  @ApiParam({
    name: 'userName',
    type: 'string',
    description: 'Unique user name',
  })
  @ApiBody({ type: EditRoleDto })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Put('user/:userName/role')
  async updateRole(
    @SessionDecorator() session: SessionContainer,
    @Param('userName') userName: string,
    @Body() editRoleDto: EditRoleDto,
  ) {
    let userId = null;
    try {
      userId = session.getUserId();
    } catch (err) {}
    return await this.usersService.updateRole(userId, userName, editRoleDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update users profile data' })
  @ApiParam({
    name: 'userName',
    type: 'string',
    description: 'Unique user name',
  })
  @ApiBody({ type: UpdateProfileDto })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access denied.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Put('user/:userName/profile')
  async updateProfile(
    @SessionDecorator() session: SessionContainer,
    @Param('userName') userName: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    let userId = null;
    try {
      userId = session.getUserId();
    } catch (err) {}
    return await this.usersService.updateProfile(
      userId,
      userName,
      updateProfileDto,
    );
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'userName',
    type: 'string',
    description: 'Unique user name',
  })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden operation.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @Delete('user/:userName')
  async deleteUser(
    @SessionDecorator() session: SessionContainer,
    @Param('userName') userName: string,
  ) {
    return await this.usersService.deleteUser(session.getUserId(), userName);
  }

  @ApiOperation({ summary: 'Get login page' })
  @ApiOkResponse({ description: 'Ok.' })
  @Get('login')
  @Render('login')
  async renderLogin() {
    return await this.usersService.getLogin();
  }

  @ApiOperation({ summary: 'Get register page' })
  @ApiOkResponse({ description: 'Ok.' })
  @Get('register')
  @Render('register')
  async login() {
    return await this.usersService.getRegister();
  }
}
