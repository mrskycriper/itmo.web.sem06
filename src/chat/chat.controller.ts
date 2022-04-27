import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { ChatService } from './chat.service';
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
  ApiTags,
} from '@nestjs/swagger';
import { CreateChatDto } from './dto/create.chat.dto';
import { EditChatDto } from './dto/edit.chat.dto';
import { CreateMessageDto } from './dto/create.message.dto';
import { TimerInterceptor } from '../timer-interceptor.service';

@ApiTags('chat')
@UseInterceptors(TimerInterceptor)
@Controller()
export class ChatController {
  constructor(private readonly chatsService: ChatService) {}

  // @ApiOperation({ summary: 'Get first bunch of user chats' })
  // @ApiQuery({
  //   name: 'userId',
  //   type: 'string',
  //   description: 'Temporary way to insert userid',
  // })
  // @ApiOkResponse({ description: 'Chats found.' })
  // @ApiBadRequestResponse({ description: 'Bad request.' })
  // @ApiNotFoundResponse({ description: 'Chats not found.' })
  // @Get('chat')
  // @Render('chat-list')
  // async getFirstChats(
  //   @Query('userId', ParseIntPipe) userId: number,
  // ): Promise<object> {
  //   return this.chatsService.getSomeChats(userId, 1);
  // }

  @ApiOperation({ summary: 'Get a page of chats' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Page selector',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get('chat')
  @Render('chat-list')
  async getSomeChats(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<object> {
    return this.chatsService.getSomeChats(userId, page);
  }

  @ApiOperation({ summary: 'Get single chat' })
  @ApiParam({
    name: 'chatId',
    type: 'string',
    description: 'Unique chat identifier',
  })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiOkResponse({ description: 'Chat found.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access forbidden.' })
  @ApiNotFoundResponse({ description: 'Chat not found.' })
  @Get('chat/:chatId')
  @Render('chat')
  async getChat(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('chatId', ParseIntPipe) chatId: number,
  ): Promise<object> {
    return this.chatsService.getChat(userId, chatId);
  }

  @ApiOperation({ summary: 'Create new chat' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Chat creator id',
  })
  @ApiBody({ type: CreateChatDto })
  @ApiCreatedResponse({ description: 'Chat created.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @Post('chat')
  async createChat(
    @Query('userId', ParseIntPipe) userId: number,
    @Body() createChatDto: CreateChatDto,
  ) {
    return this.chatsService.createChat(userId, createChatDto);
  }

  @ApiOperation({ summary: 'Delete chat' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'chatId',
    type: 'string',
    description: 'Unique chat identifier',
  })
  @ApiOkResponse({ description: 'Chat deleted.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access forbidden.' })
  @ApiNotFoundResponse({ description: 'Chat not found.' })
  @Delete('chat/:chatId')
  async deleteChat(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('chatId', ParseIntPipe) chatId: number,
  ) {
    return this.chatsService.deleteChat(userId, chatId);
  }

  @ApiOperation({ summary: 'Invite user in chat' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'chatId',
    type: 'string',
    description: 'Unique chat identifier',
  })
  @ApiParam({
    name: 'inviteId',
    type: 'string',
    description: 'Invited user id',
  })
  @ApiCreatedResponse({ description: 'User invited.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access forbidden.' })
  @ApiNotFoundResponse({ description: 'Chat or user not found.' })
  @Post('chat/:chatId/invite/:inviteId')
  async inviteUser(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('inviteId', ParseIntPipe) inviteId: number,
  ) {
    return this.chatsService.inviteUser(userId, chatId, inviteId);
  }

  @ApiOperation({ summary: 'Remove user from chat' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'chatId',
    type: 'string',
    description: 'Unique chat identifier',
  })
  @ApiParam({
    name: 'inviteId',
    type: 'string',
    description: 'Invited user id',
  })
  @ApiOkResponse({ description: 'User removed.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access forbidden.' })
  @ApiNotFoundResponse({ description: 'Chat or user not found.' })
  @Delete('chat/:chatId/users/:inviteId')
  async removeUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('unInviteId', ParseIntPipe) unInviteId: number,
  ) {
    return this.chatsService.removeUser(userId, chatId, unInviteId);
  }

  @ApiOperation({ summary: 'Edit chat properties' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'chatId',
    type: 'string',
    description: 'Unique chat identifier',
  })
  @ApiBody({ type: EditChatDto })
  @ApiOkResponse({ description: 'Chat edited.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access forbidden.' })
  @ApiNotFoundResponse({ description: 'Chat not found.' })
  @Put('chat/:chatId')
  async editChat(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('chatId', ParseIntPipe) chatId: number,
    @Body() editChatDto: EditChatDto,
  ) {
    return this.chatsService.editChat(userId, chatId, editChatDto);
  }

  @ApiOperation({ summary: 'Post new message' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'chatId',
    type: 'string',
    description: 'Unique chat identifier',
  })
  @ApiBody({ type: CreateMessageDto })
  @ApiCreatedResponse({ description: 'Message created.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access forbidden.' })
  @ApiNotFoundResponse({ description: 'Chat not found.' })
  @Post('chat/:chatId')
  async postMessage(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('chatId', ParseIntPipe) chatId: number,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.chatsService.postMessage(userId, chatId, createMessageDto);
  }

  @ApiOperation({ summary: 'Delete message' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'messageId',
    type: 'string',
    description: 'Unique message identifier',
  })
  @ApiOkResponse({ description: 'Message removed.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiForbiddenResponse({ description: 'Access forbidden.' })
  @ApiNotFoundResponse({ description: 'Chat or message not found.' })
  @Delete('messages/:messageId')
  async deleteMessage(
    @Query('userId', ParseIntPipe) userId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ) {
    return this.chatsService.deleteMessage(userId, messageId);
  }
}
