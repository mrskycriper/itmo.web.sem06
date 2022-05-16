import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { EditTopicDto } from './dto/edit.topic.dto';
import { TimerInterceptor } from '../timer-interceptor.service';
import { CreateTopicDto } from './dto/create.topic.dto';
import { SessionDecorator } from '../auth/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('topic')
@UseInterceptors(TimerInterceptor)
@Controller()
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiOperation({ summary: 'Get topics' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Page selector',
  })
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get('categories/:categoryId/topics')
  @Render('topics')
  async getSomeTopics(
    @SessionDecorator() session: SessionContainer,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<object> {
    let userId = null;
    try {
      userId = session.getUserId();
    } catch (err) {}
    return await this.topicService.getSomeTopics(userId, categoryId, page);
  }

  @ApiOperation({ summary: 'Create new topic' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiBody({ type: CreateTopicDto })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @UseGuards(AuthGuard) // TODO Обновить гарду
  @Post('topics')
  async createTopic(@Body() createTopicDto: CreateTopicDto) {
    return await this.topicService.createTopic(createTopicDto);
  }

  @ApiOperation({ summary: 'Delete single topic' })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Delete('topics/:topicId')
  async deleteTopic(@Param('topicId') topicId: number) {
    return await this.topicService.deleteTopic(topicId);
  }

  @ApiOperation({ summary: 'Edit single topic' })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiBody({ type: EditTopicDto })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Put('topics/:topicId')
  async editTopic(
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() editTopicDto: EditTopicDto,
  ) {
    return await this.topicService.editTopic(topicId, editTopicDto);
  }
}
