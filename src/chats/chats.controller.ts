import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatEntity } from './entity/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { EditChatDto } from './dto/edit-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: 'Render all users chats' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Chats found.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'No chats found.',
  })
  @Get('')
  @Render('chat-list')
  async getAllChats(@Param('userId') userId: number): Promise<object> {
    return this.chatsService.getAllChats(userId);
  }

  @ApiOperation({ summary: 'Render single chat' })
  @ApiParam({ name: 'chatId', type: 'number' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Chat found.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Chat not found.',
  })
  @Get(':chatId')
  @Render('chat')
  async getChat(
    @Param('chatId') chatId: number,
    @Param('userId') userId: number,
  ): Promise<object> {
    return this.chatsService.getChat(chatId, userId);
  }

  @ApiOperation({ summary: 'Create new chat' })
  @ApiParam({ name: 'createChatDto', type: 'CreateChatDto' })
  @ApiResponse({
    status: 201,
    description: 'Chat created.',
  })
  @Post('create')
  async createChat(@Body('createChatDto') createChatDto: CreateChatDto) {
    return this.chatsService.createChat(createChatDto);
  }

  @ApiOperation({ summary: 'Delete chat' })
  @ApiParam({ name: 'chatId', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'Chat deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Chat not found.',
  })
  @Post(':chatId/delete')
  async deleteChat(@Param('chatId') chatId: number) {
    return this.chatsService.deleteChat(chatId);
  }

  @ApiOperation({ summary: 'Invite user in chat' })
  @ApiParam({ name: 'chatId', type: 'number' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'User invited.',
  })
  @ApiResponse({
    status: 400,
    description: 'User already in.',
  })
  @ApiResponse({
    status: 404,
    description: 'Chat or/and user doesnt exist.',
  })
  @Post(':chatId/invite')
  async inviteUser(
    @Param('chatId') chatId: number,
    @Param('userId') userId: number,
  ) {
    return this.chatsService.inviteUser(chatId, userId);
  }

  @ApiOperation({ summary: 'Remove user from chat' })
  @ApiParam({ name: 'chatId', type: 'number' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'User removed.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Chat or/and user doesnt exist.',
  })
  @Post(':chatId/remove/:userId')
  async removeUser(
    @Param('chatId') chatId: number,
    @Param('userId') userId: number,
  ) {
    return this.chatsService.removeUser(chatId, userId);
  }

  @ApiOperation({ summary: 'Edit chat properties' })
  @ApiParam({ name: 'editChatDto', type: 'EditChatDto' })
  @ApiResponse({
    status: 200,
    description: 'Chat edited.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Chat not found.',
  })
  @Post(':chatId/edit')
  async editChat(@Body('editChatDto') editChatDto: EditChatDto) {
    return this.chatsService.editChat(editChatDto);
  }

  @ApiOperation({ summary: 'Post new message' })
  @ApiParam({ name: 'createMessageDto', type: 'CreateMessageDto' })
  @ApiResponse({
    status: 201,
    description: 'Message posted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Chat not found.',
  })
  @Post(':chatId/post')
  async postMessage(
    @Body('createMessageDto') createMessageDto: CreateMessageDto,
  ) {
    return this.chatsService.postMessage(createMessageDto);
  }

  @ApiOperation({ summary: 'Delete message' })
  @ApiParam({ name: 'chatId', type: 'number' })
  @ApiParam({ name: 'messageId', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'Message deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Chat or/and message doesnt exist.',
  })
  @Post(':chatId/:messageId/delete')
  async deleteMessage(
    @Param('chatId') chatId: number,
    @Param('messageId') messageId: number,
  ) {
    return this.chatsService.deleteMessage(chatId, messageId);
  }
}
