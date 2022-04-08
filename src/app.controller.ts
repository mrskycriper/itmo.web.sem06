import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';

import { TimerInterceptor } from './timer-interceptor.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@UseInterceptors(TimerInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Render main page' })
  @ApiResponse({
    status: 200,
    description: 'Main page rendered.',
  })
  @Get('/')
  @Render('main')
  async getMain() {
    return this.appService.getMain();
  }
}
