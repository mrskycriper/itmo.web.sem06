import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { TopicModule } from './topic/topic.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './all.exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ChatModule,
    PostModule,
    TopicModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
