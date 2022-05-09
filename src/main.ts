import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as express from 'express';
import { UserEntity } from './user/entity/user.entity';
import { CreateUserDto } from './user/dto/create.user.dto';
import { ProfileEntity } from './user/entity/profile.entity';
import { ChatEntity } from './chat/entity/chat.entity';
import { MessageEntity } from './chat/entity/message.entity';
import { CreateMessageDto } from './chat/dto/create.message.dto';
import { CreateChatDto } from './chat/dto/create.chat.dto';
import { EditChatDto } from './chat/dto/edit.chat.dto';
import { UpdateBioDto } from './user/dto/update.bio.dto';
import { TopicEntity } from './topic/entity/topic.entity';
import { PostEntity } from './post/entity/post.entity';
import { CreateCategoryDto } from './category/dto/create.category.dto';
import { CreateTopicDto } from './topic/dto/create.topic.dto';
import { CreatePostDto } from './post/dto/create.post.dto';
import { CreateCommentDto } from './post/dto/create.comment.dto';
import { EditCategoryDto } from './category/dto/edit.category.dto';
import { EditTopicDto } from './topic/dto/edit.topic.dto';
import { EditPostDto } from './post/dto/edit.post.dto';
import { EditCommentDto } from './post/dto/edit.comment.dto';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all.exception.filter';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { AuthInterceptor } from './auth/auth.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir([
    join(__dirname, '..', 'views'),
    join(__dirname, '..', 'views', 'partials'),
    join(__dirname, '..', 'views', 'content'),
    join(__dirname, '..', 'views', 'content', 'posts'),
  ]);
  app.setViewEngine('pug');
  app.use(express.urlencoded({ extended: true }));

  const config = new DocumentBuilder()
    .setTitle('OpenForum api')
    .setDescription('The OpenForum REST API definition')
    .setVersion('6.2.0')
    .addCookieAuth()
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
      UpdateBioDto,

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
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      operationsSorter: 'method',
    },
  });

  app.enableCors({
    origin: [process.env.WEBSITE_DOMAIN],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });
  app.useGlobalFilters(new SupertokensExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new AuthInterceptor());

  await app.listen(process.env.PORT);
}

bootstrap();
