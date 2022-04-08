import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { UserEntity } from './users/entity/user.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { LoginDto } from './users/dto/login.dto';
import { ProfileEntity } from './users/entity/profile.entity';
import { ChatEntity } from './chats/entity/chat.entity';
import { MessageEntity } from './chats/entity/message.entity';
import { CreateMessageDto } from './chats/dto/create-message.dto';
import { CreateChatDto } from './chats/dto/create-chat.dto';
import { EditChatDto } from './chats/dto/edit-chat.dto';
import { UpdateProfileDto } from './users/dto/update-profile.dto';
import { TopicEntity } from './posts/entity/topic.entity';
import { PostEntity } from './posts/entity/post.entity';
import { CreateCategoryDto } from './posts/dto/create.category.dto';
import { CreateTopicDto } from './posts/dto/create.topic.dto';
import { CreatePostDto } from './posts/dto/create.post.dto';
import { CreateCommentDto } from './posts/dto/create.comment.dto';
import { EditCategoryDto } from './posts/dto/edit.category.dto';
import { EditTopicDto } from './posts/dto/edit.topic.dto';
import { EditPostDto } from './posts/dto/edit.post.dto';
import { EditCommentDto } from './posts/dto/edit.comment.dto';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir([
    join(__dirname, '..', 'views'),
    join(__dirname, '..', 'views', 'partials'),
    join(__dirname, '..', 'views', 'content'),
    join(__dirname, '..', 'views', 'content', 'posts'),
  ]);
  app.setViewEngine('pug');
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Prisma Examples')
    .setDescription('The prisma-examples REST API definition')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [
      UserEntity,
      ProfileEntity,
      ChatEntity,
      MessageEntity,
      ChatEntity,
      TopicEntity,
      PostEntity,
      MessageEntity,

      CreateUserDto,
      LoginDto,
      UpdateUserDto,
      UpdateProfileDto,

      CreateChatDto,
      EditChatDto,
      CreateMessageDto,

      CreateCategoryDto,
      CreateTopicDto,
      CreatePostDto,
      CreateCommentDto,
      EditCategoryDto,
      EditTopicDto,
      EditPostDto,
      EditCommentDto,
    ],
  });
  SwaggerModule.setup('api', app, document);

  console.log(typeof { title: 'hello' });

  await app.listen(configService.get<number>('PORT'));
}

bootstrap();
