import {
  Get,
  Controller,
  Render,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { LoggingInterceptor } from './logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  async root() {
    await new Promise((resolve) =>
      setTimeout(resolve, 100 + Math.floor(Math.random())),
    );
  }

  @Get('/')
  @Render('main')
  root1() {
    return { title: 'Главная - OpenForum', authorised: true};
  }

  @Get('/topics')
  @Render('topics')
  root2() {
    return { title: 'Разделы - OpenForum' };
  }

  @Get('/chats')
  @Render('chats')
  root3() {
    return { title: 'Чаты - OpenForum' };
  }

  @Post('login')
  loginUser(@Res() response: Response, @Req() request: Request) {
    response.cookie('user', request.body.username);
    response.end();
  }
}
