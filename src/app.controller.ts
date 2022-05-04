import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';

import { TimerInterceptor } from './timer-interceptor.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@UseInterceptors(TimerInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Render main page' })
  @ApiOkResponse({ description: 'Ok.' })
  @Get('/')
  @Render('main')
  async getMain() {
    return this.appService.getMain();
  }
}
