import {
  HttpException,
  HttpStatus,
  Injectable,
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
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const nameTaken = await prisma.user.findUnique({
      where: { name: createUserDto.name },
    });
    if (nameTaken) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const user = await prisma.user.create({ data: createUserDto });
    await prisma.profile.create({ data: { bio: '', userId: user.id } });
  }

  async getUserProfile(userId: number): Promise<object> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

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
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    prisma.user.update({ where: { id: userId }, data: updateUserDto });
  }

  async updateRole(userId: number, isModerator: boolean, isAdmin: boolean) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isModerator: isModerator, isAdmin: isAdmin },
    });
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await prisma.profile.update({
      where: { userId: userId },
      data: updateProfileDto,
    });
  }

  async deleteUser(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const deleteProfile = prisma.profile.delete({ where: { userId: userId } });
    const deleteUser = prisma.user.delete({ where: { id: userId } });

    await prisma.$transaction([deleteProfile, deleteUser]);
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
}
