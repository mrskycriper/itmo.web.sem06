import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getMain() {
    return {
      title: 'Главная - OpenForum',
      authorised: true,
      username: 'username',
    };
  }
}
