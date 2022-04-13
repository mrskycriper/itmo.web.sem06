import {
  Body,
  HttpException,
  Injectable,
  NotImplementedException,
  Param,
} from '@nestjs/common';
import { Profile, Role } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from './entity/user.entity';
import { ProfileEntity } from './entity/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import prisma from '../client';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    const user = await prisma.user.create({
      data: createUserDto,
    });
    await prisma.profile.create({
      data: { bio: '', userId: user.id },
    });
  }

  async deleteUser(userId: number) {
    await prisma.profile.delete({
      where: {
        userId: Number(userId),
      },
    });
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: updateUserDto,
    });
  }

  async getUserProfile(userId: number): Promise<object> {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    const profile = await prisma.profile.findUnique({
      where: { userId: Number(userId) },
    });
    return {
      userId: userId,
      title: 'Профиль ' + user.name + ' - OpenForum',
      authorised: true,
      username: user.name,
      bio: profile.bio,
      role: user.role.toString(),
    };
  }

  async login(loginDto: LoginDto) {
    throw new NotImplementedException();
  }

  async logout() {
    throw new NotImplementedException();
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    await prisma.profile.update({
      where: { userId: Number(userId) },
      data: updateProfileDto,
    });
  }

  async updateRole(userId: number, role: Role) {
    await prisma.user.update({
      where: { id: Number(userId) },
      data: { role: role },
    });
  }

  async getLogin() {
    return { title: 'Авторизация - OpenForum' };
  }
}
