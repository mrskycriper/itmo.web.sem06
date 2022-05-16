import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UpdateBioDto } from './dto/update.bio.dto';
import { SessionDecorator } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { CheckUsernameDto } from './dto/check.username.dto';
import { EditRoleDto } from './dto/edit.role.dto';
import { DeleteUserGuard } from '../auth/guards/delete.user.guard';
import { UpdateBioGuard } from '../auth/guards/update.profile.guard';
import { UpdateRoleGuard } from '../auth/guards/update.role.guard';

@ApiTags('user')
@ApiCookieAuth()
@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Check if username is already taken' })
  @ApiBody({ type: CheckUsernameDto })
  @ApiOkResponse({ description: 'Ok.' })
  @Post('checkName')
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
  @Get('users/:userName')
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

  @ApiOperation({ summary: 'Change user role flags' })
  @ApiParam({
    name: 'userName',
    type: 'string',
    description: 'Unique user name',
  })
  @ApiBody({ type: EditRoleDto })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden operation.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @UseGuards(UpdateRoleGuard)
  @Put('users/:userName/role')
  async updateRole(
    @Param('userName') userName: string,
    @Body() editRoleDto: EditRoleDto,
  ) {
    return await this.usersService.updateRole(userName, editRoleDto);
  }

  @ApiOperation({ summary: 'Update user biography' })
  @ApiParam({
    name: 'userName',
    type: 'string',
    description: 'Unique user name',
  })
  @ApiBody({ type: UpdateBioDto })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Forbidden operation.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @UseGuards(UpdateBioGuard)
  @Put('users/:userName/bio')
  async updateBio(
    @Param('userName') userName: string,
    @Body() updateBioDto: UpdateBioDto,
  ) {
    return await this.usersService.updateBio(userName, updateBioDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'userName',
    type: 'string',
    description: 'Unique user name',
  })
  @ApiOkResponse({ description: 'Ok.' })
  @ApiForbiddenResponse({ description: 'Forbidden operation.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @UseGuards(DeleteUserGuard)
  @Delete('users/:userName')
  async deleteUser(@Param('userName') userName: string) {
    return await this.usersService.deleteUser(userName);
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
