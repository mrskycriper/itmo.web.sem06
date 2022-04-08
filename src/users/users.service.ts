import {
  Body,
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

@Injectable()
export class UsersService {
  async createUser(createUserDto: CreateUserDto) {
    throw new NotImplementedException();
  }

  async deleteUser(id: number) {
    throw new NotImplementedException();
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    throw new NotImplementedException();
  }

  async getUserProfile(userId: number): Promise<object> {
    return {
      userId: userId,
      title: 'Профиль ' + userId + ' - OpenForum',
      authorised: true,
      username: 'username',
    };
  }

  async login(loginDto: LoginDto) {
    throw new NotImplementedException();
  }

  async logout() {
    throw new NotImplementedException();
  }

  async updateBio(updateProfileDto: UpdateProfileDto) {
    throw new NotImplementedException();
  }

  async updateRole(userId: number, role: Role) {
    throw new NotImplementedException();
  }

  async getLogin() {
    return { title: 'Авторизация - OpenForum' };
  }
}
