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
import { PostService } from './post.service';
import { EditPostDto } from './dto/edit.post.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { EditCommentDto } from './dto/edit.comment.dto';
import { TimerInterceptor } from '../timer-interceptor.service';
import { CreatePostDto } from './dto/create.post.dto';

@ApiTags('post')
@UseInterceptors(TimerInterceptor)
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Get posts list' })
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
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get('category/:categoryId/topic/:topicId/posts')
  @Render('post-list')
  async getTopic(
    @Query('userId') userId: string,
    @Query('page', ParseIntPipe) page: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
  ) {
    return await this.postService.getTopic(userId, categoryId, topicId, page);
  }

  @ApiOperation({ summary: 'Create new post' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiBody({ type: CreatePostDto })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Post('category/:categoryId/topic/:topicId/posts')
  async createPost(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postService.createPost(
      categoryId,
      topicId,
      createPostDto,
    );
  }

  @ApiOperation({ summary: 'Delete single post' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiParam({ name: 'postId', type: 'number', description: 'Unique post id' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Delete('category/:categoryId/topic/:topicId/posts/:postId')
  async deletePost(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return await this.postService.deletePost(categoryId, topicId, postId);
  }

  @ApiOperation({ summary: 'Edit single post' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiParam({ name: 'postId', type: 'number', description: 'Unique post id' })
  @ApiBody({ type: EditPostDto })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Put('category/:categoryId/topic/:topicId/posts/:postId')
  async editPost(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body('editPostDto') editPostDto: EditPostDto,
  ) {
    return await this.postService.editPost(
      categoryId,
      topicId,
      postId,
      editPostDto,
    );
  }

  @ApiOperation({ summary: 'Get single post' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiParam({ name: 'postId', type: 'number', description: 'Unique post id' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Get('category/:categoryId/topic/:topicId/posts/:postId')
  @Render('post')
  async getPost(
    @Query('userId') userId: string,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Param('postId', ParseIntPipe) postId: number,
  ): Promise<object> {
    return await this.postService.getPost(userId, categoryId, topicId, postId);
  }

  @ApiOperation({ summary: 'Create new comment' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiParam({ name: 'postId', type: 'number', description: 'Unique post id' })
  @ApiBody({ type: CreateCommentDto })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Post('category/:categoryId/topic/:topicId/posts/:postId/comments')
  async createComment(
    @Query('userId') userId: string,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.postService.createComment(
      userId,
      categoryId,
      topicId,
      postId,
      createCommentDto,
    );
  }

  @ApiOperation({ summary: 'Delete single comment' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiParam({ name: 'postId', type: 'number', description: 'Unique post id' })
  @ApiParam({
    name: 'commentId',
    type: 'string',
    description: 'Unique comment identifier',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Delete(
    'category/:categoryId/topic/:topicId/posts/:postId/comments/:commentId',
  )
  async deleteComment(
    @Query('userId') userId: string,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return await this.postService.deleteComment(
      userId,
      categoryId,
      topicId,
      postId,
      commentId,
    );
  }

  @ApiOperation({ summary: 'Edit single comment' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category id',
  })
  @ApiParam({ name: 'topicId', type: 'string', description: 'Unique topic id' })
  @ApiParam({ name: 'postId', type: 'number', description: 'Unique post id' })
  @ApiParam({
    name: 'commentId',
    type: 'string',
    description: 'Unique comment identifier',
  })
  @ApiBody({ type: EditCommentDto })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Put('category/:categoryId/topic/:topicId/posts/:postId/comments/:commentId')
  async editComment(
    @Query('userId') userId: string,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() editCommentDto: EditCommentDto,
  ) {
    return await this.postService.editComment(
      userId,
      categoryId,
      topicId,
      postId,
      commentId,
      editCommentDto,
    );
  }
}
