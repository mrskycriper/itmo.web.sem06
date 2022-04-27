import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { EditPostDto } from './dto/edit.post.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { EditCommentDto } from './dto/edit.comment.dto';
import { CreatePostDto } from './dto/create.post.dto';
import prisma from '../client';

@Injectable()
export class PostService {
  async getTopic(
    userId: number,
    categoryId: number,
    topicId: number,
    page: number,
  ) {
    const take = 5;
    const user = await this._getUser(userId);
    await this._getCategory(categoryId);
    const topic = await this._getTopic(topicId);

    const posts = await prisma.post.findMany({
      skip: (page - 1) * take,
      take: take,
      where: { topicId: topicId },
    });

    const pageCount = Math.ceil(posts.length / take);
    if (page < 1 || page > pageCount) {
      throw new BadRequestException('Invalid page number');
    }

    return {
      title: topic.name + ' - OpenForum',
      authorised: true,
      username: user.name,
      userId: userId,
      topicName: topic.name,
      topicId: topicId,
      posts: posts,
      pageCount: pageCount,
      page: page,
    };
  }

  async createPost(
    categoryId: number,
    topicId: number,
    createPostDto: CreatePostDto,
  ) {
    await this._getCategory(categoryId);
    await this._getTopic(topicId);
    await prisma.post.create({
      data: createPostDto,
    });
  }

  async deletePost(categoryId: number, topicId: number, postId: number) {
    await this._getCategory(categoryId);
    await this._getTopic(topicId);
    await this._getPost(postId);
    await prisma.post.delete({ where: { id: postId } });
  }

  async editPost(
    categoryId: number,
    topicId: number,
    postId: number,
    editPostDto: EditPostDto,
  ) {
    await this._getCategory(categoryId);
    await this._getTopic(topicId);
    await this._getPost(postId);
    await prisma.post.update({ where: { id: postId }, data: editPostDto });
  }

  async getPost(
    userId: number,
    categoryId: number,
    topicId: number,
    postId: number,
  ) {
    const user = await this._getUser(userId);
    await this._getCategory(categoryId);
    await this._getTopic(topicId);
    const post = await this._getPost(postId);
    if (
      !post.published &&
      (user.id != post.userId || !user.isAdmin || !user.isModerator)
    ) {
      throw new ForbiddenException('Access forbidden');
    }
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
    });
    return {
      title: post.title + ' - OpenForum',
      postTitle: post.title,
      postContent: post.content,
      createdAt: post.createdAt,
      authorised: true,
      username: user.name,
      userid: user.id,
      comments: comments,
      postId: postId,
    };
  }

  async createComment(
    userId: number,
    categoryId: number,
    topicId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
  ) {
    await this._getUser(userId);
    await this._getCategory(categoryId);
    await this._getTopic(topicId);
    const post = await this._getPost(postId);
    if (!post.published) {
      throw new ForbiddenException('Forbidden operation');
    }
    await prisma.comment.create({ data: createCommentDto });
  }

  async deleteComment(
    userId: number,
    categoryId: number,
    topicId: number,
    postId: number,
    commentId: number,
  ) {
    const user = await this._getUser(userId);
    await this._getCategory(categoryId);
    await this._getTopic(topicId);
    await this._getPost(postId);
    const comment = await this._getComment(commentId);
    if (user.id != comment.userId || !user.isAdmin || !user.isModerator) {
      throw new ForbiddenException('Forbidden operation');
    }
    await prisma.comment.delete({ where: { id: commentId } });
  }

  async editComment(
    userId: number,
    categoryId: number,
    topicId: number,
    postId: number,
    commentId: number,
    editCommentDto: EditCommentDto,
  ) {
    const user = await this._getUser(userId);
    await this._getCategory(categoryId);
    await this._getTopic(topicId);
    await this._getPost(postId);
    const comment = await this._getComment(commentId);
    if (user.id != comment.userId) {
      throw new ForbiddenException('Forbidden operation');
    }
    await prisma.comment.update({
      where: { id: commentId },
      data: editCommentDto,
    });
  }

  async _getUser(userId: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async _getCategory(categoryId: number) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (category == null) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async _getTopic(topicId: number) {
    const topic = await prisma.topic.findUnique({
      where: { id: topicId },
    });
    if (topic == null) {
      throw new NotFoundException('Topic not found');
    }
    return topic;
  }

  async _getPost(postId: number) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (post == null) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async _getComment(commentId: number) {
    const comment = await prisma.post.findUnique({
      where: { id: commentId },
    });
    if (comment == null) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }
}
