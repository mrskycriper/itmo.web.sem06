import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EditPostDto } from './dto/edit.post.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { CreatePostDto } from './dto/create.post.dto';
import prisma from '../client';

@Injectable()
export class PostService {
  async createPost(createPostDto: CreatePostDto): Promise<object> {
    const topic = await prisma.topic.findUnique({
      where: { id: createPostDto.topicId },
    });
    if (topic == null) {
      throw new NotFoundException('Topic not found');
    }
    const post = await prisma.post.create({
      data: createPostDto,
    });
    return { postId: post.id };
  }

  async deletePost(postId: number) {
    await prisma.post.delete({ where: { id: postId } });
  }

  async editPost(postId: number, editPostDto: EditPostDto) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (post == null) {
      throw new NotFoundException('Post not found');
    }
    await prisma.post.update({ where: { id: postId }, data: editPostDto });
  }

  async getPost(userId: string, postId: number, page: number) {
    if (page < 1) {
      throw new BadRequestException('Invalid page number');
    }
    const take = 5;
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (post == null) {
      throw new NotFoundException('Post not found');
    }
    let user = null;
    let edit = false;
    let canPost = false;
    if (userId != null) {
      user = await prisma.user.findUnique({ where: { id: userId } });
      canPost = true;
      if (post.userId == user.id || user.isAdmin || user.isModerator) {
        edit = true;
      }
    }

    const comments = await prisma.comment.findMany({
      skip: (page - 1) * take,
      take: take,
      orderBy: { createdAt: 'asc' },
      where: { postId: postId },
      include: {
        author: true,
      },
    });
    let empty = true;
    if (Object.keys(comments).length != 0) {
      empty = false;
    }
    const commentsAll = await prisma.comment.findMany({
      where: { postId: postId },
    });

    let pageCount = Math.ceil(commentsAll.length / take);
    if (pageCount == 0) {
      pageCount = 1;
    }
    if (page > pageCount) {
      throw new BadRequestException('Invalid page number');
    }

    const author = await prisma.user.findUnique({ where: { id: post.userId } });
    return {
      title: post.title + ' - OpenForum',
      postTitle: post.title,
      postContent: post.content,
      createdAt: post.createdAt,
      authorName: author.name,
      comments: comments,
      postId: postId,
      page: page,
      pageCount: pageCount,
      edit: edit,
      post: canPost,
      empty: empty,
    };
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const post = await prisma.post.findUnique({
      where: { id: createCommentDto.postId },
    });
    if (post == null) {
      throw new NotFoundException('Post not found');
    }
    await prisma.comment.create({ data: createCommentDto });
  }

  async getSettings(postId: number) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (post == null) {
      throw new NotFoundException('Post not found');
    }
    return {
      title: post.title + ' - OpenForum',
      postTitle: post.title,
      postContent: post.content,
      postId: postId,
    };
  }
}
