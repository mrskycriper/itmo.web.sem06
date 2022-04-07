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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir([
    join(__dirname, '..', 'views'),
    join(__dirname, '..', 'views', 'partials'),
    join(__dirname, '..', 'views', 'content'),
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
      CreateUserDto,
      UpdateUserDto,
      LoginDto,
      UpdateProfileDto,
      ProfileEntity,
      ChatEntity,
      MessageEntity,
      CreateChatDto,
      CreateMessageDto,
      EditChatDto,
    ],
  });
  SwaggerModule.setup('api', app, document);

  console.log(typeof { title: 'hello' });

  await app.listen(configService.get<number>('PORT'));
}

bootstrap();
