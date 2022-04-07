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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('default')
@UseInterceptors(TimerInterceptor)
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Render main page' })
  @Get('/')
  @Render('main')
  renderMain() {
    return {
      title: 'Главная - OpenForum',
      authorised: true,
      username: 'username',
    };
  }

  @ApiOperation({ summary: 'Render login page' })
  @Get('/login')
  @Render('login')
  renderLogin() {
    return { title: 'Авторизация - OpenForum' };
  }

  @ApiOperation({ summary: 'Render topics page' })
  @Get('/topics')
  @Render('topics')
  renderTopics() {
    return { title: 'Разделы - OpenForum' };
  }
}
