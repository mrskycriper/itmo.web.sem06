import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create.chat.dto';
import { EditChatDto } from './dto/edit.chat.dto';
import { CreateMessageDto } from './dto/create.message.dto';
import prisma from '../client';

@Injectable()
export class ChatService {
  async getSomeChats(userId: string, page: number): Promise<object> {
    const user = await this._getUser(userId);
    const take = 5;
    const count = await this._getChatAmount(userId);
    const pageCount = Math.ceil(count / take);
    if (page < 1 || page > pageCount) {
      throw new BadRequestException('Invalid page number');
    }
    const chats = await this._getChats(userId, page, take);

    return {
      title: 'Чаты - OpenForum',
      authorised: true,
      username: user.name,
      userid: user.id,
      chatData: chats,
      pageCount: pageCount,
      page: page,
    };
  }

  async _getChats(userId: string, page: number, take: number): Promise<object> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        ChatToUser: {
          take: take,
          skip: (page - 1) * take,
          select: {
            chat: true,
          },
        },
      },
    });
    return user.ChatToUser;
  }

  async _getChatAmount(userId: string) {
    const count = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        ChatToUser: {
          select: {
            chat: true,
          },
        },
      },
    });
    return count.ChatToUser.length;
  }

  async getChat(userId: string, chatId: number): Promise<object> {
    const user = await this._getUser(userId);
    const chat = await this._getChat(chatId);
    await this._checkChat(userId, chatId);

    const messages = await prisma.message.findMany({
      where: { chatId: chat.id },
      orderBy: {
        createdAt: 'asc',
      },
      include: { author: true },
    });

    return {
      title: 'Чат ' + chat.name + ' - OpenForum',
      chatName: chat.name,
      chatId: chatId,
      authorised: true,
      username: user.name,
      userid: user.id,
      messages: messages,
    };
  }

  async inviteUser(userId: string, chatId: number, inviteId: string) {
    await this._getUser(userId);
    await this._getUser(inviteId);
    await this._getChat(chatId);
    await this._checkChat(userId, chatId);

    await prisma.chatToUser.create({
      data: { userId: inviteId, chatId: chatId },
    });
  }

  async removeUser(userId: string, chatId: number, unInviteId: string) {
    await this._getUser(userId);
    await this._getUser(unInviteId);
    await this._getChat(chatId);
    await this._checkChat(userId, chatId);
    await this._checkChat(unInviteId, chatId);

    await prisma.chatToUser.delete({
      where: {
        chatId_userId: {
          chatId: chatId,
          userId: unInviteId,
        },
      },
    });
  }

  async createChat(userId: string, createChatDto: CreateChatDto) {
    await this._getUser(userId);
    const chat = await prisma.chat.create({
      data: createChatDto,
    });
    await prisma.chatToUser.create({
      data: { userId: userId, chatId: chat.id },
    });
  }

  async deleteChat(userId: string, chatId: number) {
    await this._getUser(userId);
    const chat = await this._getChat(chatId);
    await this._checkChat(userId, chatId);

    const deleteMessages = prisma.message.deleteMany({
      where: { chatId: chat.id },
    });
    const deleteChatToUser = prisma.chatToUser.deleteMany({
      where: { chatId: chat.id },
    });
    const deleteChat = prisma.chat.delete({ where: { id: chat.id } });

    await prisma.$transaction([deleteMessages, deleteChatToUser, deleteChat]);
  }

  async editChat(userId: string, chatId: number, editChatDto: EditChatDto) {
    await this._getUser(userId);
    await this._getChat(chatId);
    await this._checkChat(userId, chatId);

    await prisma.chat.update({ where: { id: chatId }, data: editChatDto });
  }

  async postMessage(
    userId: string,
    chatId: number,
    createMessageDto: CreateMessageDto,
  ) {
    await this._getUser(userId);
    await this._getChat(chatId);
    await this._checkChat(userId, chatId);
    await prisma.message.create({
      data: {
        createdAt: new Date(),
        content: createMessageDto.content,
        userId: userId,
        chatId: chatId,
      },
    });
  }

  async deleteMessage(userId: string, messageId: number) {
    const user = await this._getUser(userId);
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });
    if (message == null) {
      throw new NotFoundException('Message not found');
    }
    if (message.userId != user.id && !user.isModerator && !user.isAdmin) {
      throw new ForbiddenException('Unauthorised operation');
    }

    await prisma.message.delete({ where: { id: messageId } });
  }

  async _getUser(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async _getChat(chatId: number) {
    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (chat == null) {
      throw new NotFoundException('Chat not found');
    }
    return chat;
  }

  async _checkChat(userId: string, chatId: number) {
    const userIds = await prisma.chatToUser.findMany({
      where: { chatId: chatId },
    });
    let access = false;
    for (const i of userIds) {
      if (i.userId == userId) {
        access = true;
      }
    }
    if (!access) {
      throw new ForbiddenException('Unauthorised operation');
    }
  }
}
