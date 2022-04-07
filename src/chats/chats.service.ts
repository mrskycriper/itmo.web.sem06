import { Injectable, NotImplementedException } from '@nestjs/common';
import { ChatEntity } from './entity/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { EditChatDto } from './dto/edit-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatsService {
  async getAllChats(userId: number): Promise<object> {
    return {
      title: 'Чаты - OpenForum',
      authorised: true,
      username: 'username',
    };
  }

  async getChat(chatId: number, userId: number): Promise<object> {
    return {
      chatId: chatId,
      title: chatId + ' - OpenForum',
      authorised: true,
      username: 'username',
    };
  }

  async inviteUser(userId: number, chatId: number) {
    throw new NotImplementedException();
  }

  async removeUser(userId: number, chatId: number) {
    throw new NotImplementedException();
  }

  async createChat(createChatDto: CreateChatDto) {
    throw new NotImplementedException();
  }

  async deleteChat(chatId: number) {
    throw new NotImplementedException();
  }

  async editChat(editChatDto: EditChatDto) {
    throw new NotImplementedException();
  }

  async postMessage(createMessageDto: CreateMessageDto) {
    throw new NotImplementedException();
  }

  async deleteMessage(chatId: number, messageId: number) {
    throw new NotImplementedException();
  }
}
