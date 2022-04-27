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
  // async getFirstChats(userId: number): Promise<object> {
  //   const user = await this._getUser(userId);
  //
  //   // const user = await prisma.user.findUnique({
  //   //   where: {
  //   //     id: userId,
  //   //   },
  //   //   include: {
  //   //     ChatToUser: {
  //   //       take: 25,
  //   //       skip: 0,
  //   //       select: {
  //   //         chat: true,
  //   //       },
  //   //     },
  //   //   },
  //   // });
  //
  //   const chats = await this.getSomeChats(userId, 1);
  //
  //   return {
  //     title: 'Чаты - OpenForum',
  //     authorised: true,
  //     username: user.name,
  //     userid: user.id,
  //     chats: chats,
  //     page: 1,
  //   };
  // }

  async getSomeChats(userId: number, page: number): Promise<object> {
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

  async _getChats(userId: number, page: number, take: number): Promise<object> {
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

  async _getChatAmount(userId: number) {
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

  async getChat(userId: number, chatId: number): Promise<object> {
    const user = await this._getUser(userId);
    const chat = await this._getChat(userId);
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

  async inviteUser(userId: number, chatId: number, inviteId: number) {
    await this._getUser(userId);
    await this._getUser(inviteId);
    await this._getChat(userId);
    await this._checkChat(userId, chatId);

    await prisma.chatToUser.create({
      data: { userId: inviteId, chatId: chatId },
    });
  }

  async removeUser(userId: number, chatId: number, unInviteId: number) {
    await this._getUser(userId);
    await this._getUser(unInviteId);
    await this._getChat(userId);
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

  async createChat(userId: number, createChatDto: CreateChatDto) {
    await this._getUser(userId);
    const chat = await prisma.chat.create({
      data: createChatDto,
    });
    await prisma.chatToUser.create({
      data: { userId: userId, chatId: chat.id },
    });
  }

  async deleteChat(userId: number, chatId: number) {
    await this._getUser(userId);
    const chat = await this._getChat(userId);
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

  async editChat(userId: number, chatId: number, editChatDto: EditChatDto) {
    await this._getUser(userId);
    await this._getChat(userId);
    await this._checkChat(userId, chatId);

    await prisma.chat.update({ where: { id: chatId }, data: editChatDto });
  }

  async postMessage(
    userId: number,
    chatId: number,
    createMessageDto: CreateMessageDto,
  ) {
    await this._getUser(userId);
    await this._getChat(userId);
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

  async deleteMessage(userId: number, messageId: number) {
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

  async _getUser(userId: number) {
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

  async _checkChat(userId: number, chatId: number) {
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
