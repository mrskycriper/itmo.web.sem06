import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { EditTopicDto } from './dto/edit.topic.dto';
import { CreatePostDto } from '../post/dto/create.post.dto';

@ApiTags('topic')
@Controller()
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiOperation({ summary: 'Delete single topic' })
  @ApiParam({ name: 'topicId', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'Topic deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Topic not found.',
  })
  @Delete('topic/:topicId')
  async deleteTopic(@Param('topicId') topicId: number) {
    return this.topicService.deleteTopic(topicId);
  }

  @ApiOperation({ summary: 'Edit single topic' })
  @ApiParam({ name: 'editTopicDto', type: 'EditTopicDto' })
  @ApiResponse({
    status: 201,
    description: 'Topic edited.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Topic not found.',
  })
  @Put('topic/:topicId')
  async editTopic(@Body('editTopicDto') editTopicDto: EditTopicDto) {
    return this.topicService.editTopic(editTopicDto);
  }

  @ApiOperation({ summary: 'Render single topic' })
  @ApiParam({ name: 'topicId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Topic rendered.',
  })
  @ApiResponse({
    status: 404,
    description: 'Topic not found.',
  })
  @Get('topic/:topicId')
  @Render('topic')
  async getTopic(@Param('topicId') topicId: number) {
    return this.topicService.getTopic(topicId);
  }

  @ApiOperation({ summary: 'Create new post' })
  @ApiParam({ name: 'createPostDto', type: 'CreatePostDto' })
  @ApiResponse({
    status: 201,
    description: 'Post created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Topic not found.',
  })
  @Post('topic/:topicId/posts')
  async createPost(@Body('createPostDto') createPostDto: CreatePostDto) {
    return this.topicService.createPost(createPostDto);
  }
}
