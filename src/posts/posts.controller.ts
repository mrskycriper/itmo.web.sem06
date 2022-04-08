import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import { CreateTopicDto } from './dto/create.topic.dto';
import { EditTopicDto } from './dto/edit.topic.dto';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { EditCommentDto } from './dto/edit.comment.dto';

@ApiTags('posts')
@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Renders category list' })
  @ApiResponse({
    status: 200,
    description: 'All categorys rendered.',
  })
  @Get('category')
  @Render('category-list')
  async getAllCategory(): Promise<object> {
    return this.postsService.getAllCategory();
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiParam({ name: 'createCategoryDto', type: 'CreateCategoryDto' })
  @ApiResponse({
    status: 201,
    description: 'Category created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @Post('category')
  async createCategory(
    @Body('createCategoryDto') createCategoryDto: CreateCategoryDto,
  ) {
    return this.postsService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Renders single category' })
  @ApiParam({ name: 'categoryId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Category rendered.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Get('category/:categoryId')
  @Render('category')
  async getCategory(@Param('categoryId') categoryId: number) {
    return this.postsService.getCategory(categoryId);
  }

  @ApiOperation({ summary: 'Delete single category' })
  @ApiParam({ name: 'categoryId', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'Category deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Delete('category/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: number) {
    return this.postsService.deleteCategory(categoryId);
  }

  @ApiOperation({ summary: 'Edit single category' })
  @ApiParam({ name: 'editCategoryDto', type: 'EditCategoryDto' })
  @ApiResponse({
    status: 201,
    description: 'Category edited.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Post('category/:categoryId/edit')
  async editCategory(
    @Body('editCategoryDto') editCategoryDto: EditCategoryDto,
  ) {
    return this.postsService.editCategory(editCategoryDto);
  }

  @ApiOperation({ summary: 'Create new topic' })
  @ApiParam({ name: 'createTopicDto', type: 'CreateTopicDto' })
  @ApiResponse({
    status: 201,
    description: 'Topic created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Post('category/:categoryId')
  async createTopic(@Body('createTopicDto') createTopicDto: CreateTopicDto) {
    return this.postsService.createTopic(createTopicDto);
  }

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
    return this.postsService.deleteTopic(topicId);
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
  @Post('topic/:topicId/edit')
  async editTopic(@Body('editTopicDto') editTopicDto: EditTopicDto) {
    return this.postsService.editTopic(editTopicDto);
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
    return this.postsService.getTopic(topicId);
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
  @Post('topic/:topicId')
  async createPost(@Body('createPostDto') createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Delete single post' })
  @ApiParam({ name: 'postId', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'Post deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  @Delete('post/:postId')
  async deletePost(@Param('postId') postId: number) {
    return this.postsService.deletePost(postId);
  }

  @ApiOperation({ summary: 'Edit single post' })
  @ApiParam({ name: 'editPostDto', type: 'EditPostDto' })
  @ApiResponse({
    status: 201,
    description: 'Post edited.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  @Post('post/:postId/edit')
  async editPost(@Body('editPostDto') editPostDto: EditPostDto) {
    return this.postsService.editPost(editPostDto);
  }

  @ApiOperation({ summary: 'Render single post' })
  @ApiParam({ name: 'postId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Post rendered.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  @Get('post/:postId')
  @Render('post')
  async getPost(@Param('postId') postId: number) {
    return this.postsService.getPost(postId);
  }

  @ApiOperation({ summary: 'Create new comment' })
  @ApiParam({ name: 'createCommentDto', type: 'CreateCommentDto' })
  @ApiResponse({
    status: 201,
    description: 'Comment created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  @Post('post/:postId')
  async createComment(
    @Body('createCommentDto') createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'Delete single comment' })
  @ApiParam({ name: 'commentId', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'Comment deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.',
  })
  @Delete('comment/:commentId')
  async deleteComment(@Param('commentId') commentId: number) {
    return this.postsService.deleteComment(commentId);
  }

  @ApiOperation({ summary: 'Edit single comment' })
  @ApiParam({ name: 'editCommentDto', type: 'EditCommentDto' })
  @ApiResponse({
    status: 201,
    description: 'Comment edited.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Comment not found.',
  })
  @Post('comment/:commentId/edit')
  async editComment(@Body('editCommentDto') editCommentDto: EditCommentDto) {
    return this.postsService.editComment(editCommentDto);
  }
}
