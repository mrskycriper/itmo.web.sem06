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
  UseInterceptors,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { EditTopicDto } from './dto/edit.topic.dto';
import { TimerInterceptor } from '../timer-interceptor.service';
import { CreateTopicDto } from './dto/create.topic.dto';

@ApiTags('topic')
@UseInterceptors(TimerInterceptor)
@Controller()
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiOperation({ summary: 'Get topics list' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Page selector',
  })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get('category/:categoryId/topics')
  @Render('topic-list')
  async getSomeTopics(
    @Query('userId') userId: number,
    @Query('page', ParseIntPipe) page: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<object> {
    return await this.topicService.getSomeTopics(+userId, categoryId, page);
  }

  @ApiOperation({ summary: 'Create new topic' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiBody({ type: CreateTopicDto })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Post('category/:categoryId/topics')
  async createTopic(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() createTopicDto: CreateTopicDto,
  ) {
    return await this.topicService.createTopic(categoryId, createTopicDto);
  }

  @ApiOperation({ summary: 'Delete single topic' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Delete('category/:categoryId/topics/:topicId')
  async deleteTopic(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId') topicId: number,
  ) {
    return await this.topicService.deleteTopic(categoryId, topicId);
  }

  @ApiOperation({ summary: 'Edit single topic' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiBody({ type: EditTopicDto })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Put('category/:categoryId/topics/:topicId')
  async editTopic(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() editTopicDto: EditTopicDto,
  ) {
    return await this.topicService.editTopic(categoryId, topicId, editTopicDto);
  }
}
