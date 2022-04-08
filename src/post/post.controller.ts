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
import { PostService } from './post.service';
import { EditPostDto } from './dto/edit.post.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { EditCommentDto } from './dto/edit.comment.dto';

@ApiTags('post')
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

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
    return this.postService.deletePost(postId);
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
  @Put('post/:postId')
  async editPost(@Body('editPostDto') editPostDto: EditPostDto) {
    return this.postService.editPost(editPostDto);
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
    return this.postService.getPost(postId);
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
    return this.postService.createComment(createCommentDto);
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
    return this.postService.deleteComment(commentId);
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
  @Put('comment/:commentId')
  async editComment(@Body('editCommentDto') editCommentDto: EditCommentDto) {
    return this.postService.editComment(editCommentDto);
  }
}
