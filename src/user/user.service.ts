import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
import prisma from '../client';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    const emailTaken = await prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (emailTaken) {
      throw new BadRequestException('Email already in use');
    }

    const nameTaken = await prisma.user.findUnique({
      where: { name: createUserDto.name },
    });
    if (nameTaken) {
      throw new BadRequestException('Username already taken');
    }

    const user = await prisma.user.create({ data: createUserDto });
    await prisma.profile.create({
      data: { bio: '', userId: user.id, username: user.name },
    });
  }

  async getUserProfile(userId: number): Promise<object> {
    const user = await this._getUser(userId);

    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    let role = 'Пользователь';
    if (user.isModerator && !user.isAdmin) {
      role = 'Модератор';
    }
    if (user.isAdmin) {
      role = 'Администратор';
    }

    return {
      userId: userId,
      title: 'Профиль ' + user.name + ' - OpenForum',
      authorised: true,
      username: user.name,
      bio: profile.bio,
      role: role,
    };
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    await this._getUser(userId);

    const updateUser = prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
    const updateProfile = prisma.profile.update({
      where: { userId: userId },
      data: { username: updateUserDto.name },
    });
    const updateMessages = prisma.message.updateMany({
      where: { userId: userId },
      data: { username: updateUserDto.name },
    });
    const updatePosts = prisma.post.updateMany({
      where: { userId: userId },
      data: { username: updateUserDto.name },
    });
    const updateComments = prisma.comment.updateMany({
      where: { userId: userId },
      data: { username: updateUserDto.name },
    });

    await prisma.$transaction([
      updateUser,
      updateProfile,
      updateMessages,
      updatePosts,
      updateComments,
    ]);
  }

  async updateRole(userId: number, isModerator: boolean, isAdmin: boolean) {
    await this._getUser(userId);

    await prisma.user.update({
      where: { id: userId },
      data: { isModerator: isModerator, isAdmin: isAdmin },
    });
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    await this._getUser(userId);

    await prisma.profile.update({
      where: { userId: userId },
      data: updateProfileDto,
    });
  }

  async deleteUser(userId: number) {
    await this._getUser(userId);
    await prisma.user.delete({ where: { id: userId } });
  }

  async getLogin() {
    return { title: 'Авторизация - OpenForum' };
  }

  async login(loginDto: LoginDto) {
    throw new NotImplementedException();
  }

  async logout() {
    throw new NotImplementedException();
  }

  async _getUser(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
