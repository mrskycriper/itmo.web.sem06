import {
  HttpException,
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { ChatEntity } from './entity/chat.entity';
import { CreateChatDto } from './dto/create.chat.dto';
import { EditChatDto } from './dto/edit.chat.dto';
import { CreateMessageDto } from './dto/create.message.dto';
import prisma from '../client';

@Injectable()
export class ChatService {
  async getAllChats(userId: number): Promise<object> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const chatIds = await prisma.chatToUser.findMany({
      where: { userId: userId },
    });

    const chatArray = [];
    for (const i of chatIds) {
      const chat = await prisma.chat.findUnique({ where: { id: i.chatId } });
      chatArray.push({
        chatId: chat.id,
        name: chat.name,
        description: chat.description,
      });
    }

    return {
      title: 'Чаты - OpenForum',
      authorised: true,
      username: user.name,
      userid: user.id,
      chats: chatArray,
    };
  }

  async getChat(userId: number, chatId: number): Promise<object> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (chat == null) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }

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
      throw new HttpException('Access forbidden.', HttpStatus.FORBIDDEN);
    }

    const messages = await prisma.message.findMany({
      where: { chatId: chat.id },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return {
      chatName: chat.name,
      chatId: chatId,
      title: 'Чат ' + chat.name + ' - OpenForum',
      authorised: true,
      username: user.name,
      userid: user.id,
      messageArray: messages,
    };
  }

  async inviteUser(userId: number, chatId: number, inviteId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const invite = await prisma.user.findUnique({ where: { id: inviteId } });
    if (user == null || invite == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (chat == null) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }

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
      throw new HttpException('Access forbidden.', HttpStatus.FORBIDDEN);
    }

    await prisma.chatToUser.create({
      data: { userId: inviteId, chatId: chatId },
    });
  }

  async removeUser(userId: number, chatId: number, unInviteId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const unInvite = await prisma.user.findUnique({
      where: { id: unInviteId },
    });
    if (user == null || unInvite == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (chat == null) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }

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
      throw new HttpException('Access forbidden.', HttpStatus.FORBIDDEN);
    }

    await prisma.chatToUser.delete({
      where: {
        chatId_userId: {
          chatId: chatId,
          userId: unInviteId,
        },
      },
    });
  }

  async createChat(creatorId: number, createChatDto: CreateChatDto) {
    const user = await prisma.user.findUnique({ where: { id: creatorId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const chat = await prisma.chat.create({
      data: createChatDto,
    });
    await prisma.chatToUser.create({
      data: { userId: creatorId, chatId: chat.id },
    });
  }

  async deleteChat(userId: number, chatId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (chat == null) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }

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
      throw new HttpException('Access forbidden.', HttpStatus.FORBIDDEN);
    }

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
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const chat = await prisma.chat.findUnique({ where: { id: chatId } });
    if (chat == null) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }
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
      throw new HttpException('Access forbidden.', HttpStatus.FORBIDDEN);
    }

    await prisma.chat.update({ where: { id: chatId }, data: editChatDto });
  }

  async postMessage(userId: number, createMessageDto: CreateMessageDto) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const chat = await prisma.chat.findUnique({
      where: { id: createMessageDto.chatId },
    });
    if (chat == null) {
      throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
    }
    const userIds = await prisma.chatToUser.findMany({
      where: { chatId: createMessageDto.chatId },
    });
    let access = false;
    for (const i of userIds) {
      if (i.userId == userId) {
        access = true;
      }
    }
    if (!access) {
      throw new HttpException('Access forbidden.', HttpStatus.FORBIDDEN);
    }
    await prisma.message.create({
      data: {
        createdAt: new Date(),
        content: createMessageDto.content,
        userId: createMessageDto.userId,
        chatId: createMessageDto.chatId,
      },
    });
  }

  async deleteMessage(userId: number, messageId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });
    if (message == null) {
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    }
    if (message.userId != user.id && !user.isModerator && !user.isAdmin) {
      throw new HttpException('Access forbidden.', HttpStatus.FORBIDDEN);
    }

    await prisma.message.delete({ where: { id: messageId } });
  }
}
