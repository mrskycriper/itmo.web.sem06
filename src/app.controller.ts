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
import { TimerInterceptor } from './timer-interceptor.service';

@UseInterceptors(TimerInterceptor)
@Controller()
export class AppController {
  @Get('/')
  @Render('main')
  renderMain() {
    return { title: 'Главная - OpenForum', authorised: true };
  }

  @Get('/topics')
  @Render('topics')
  renderTopics() {
    return { title: 'Разделы - OpenForum' };
  }

  @Get('/chats')
  @Render('chats')
  renderChats() {
    return { title: 'Чаты - OpenForum' };
  }

  @Post('login')
  loginUser(@Res() response: Response, @Req() request: Request) {
    response.cookie('user', request.body.username);
    //response.end();
    response.redirect('back');
  }
}
