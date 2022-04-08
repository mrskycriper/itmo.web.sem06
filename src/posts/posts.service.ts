import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import { CreateTopicDto } from './dto/create.topic.dto';
import { EditTopicDto } from './dto/edit.topic.dto';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { EditCommentDto } from './dto/edit.comment.dto';

@Injectable()
export class PostsService {
  async getAllCategory() {
    return {
      title: 'Категории - OpenForum',
      authorised: true,
      username: 'username',
    };
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    throw new NotImplementedException();
  }

  async getCategory(categoryId: number) {
    return {
      categoryId: categoryId,
      title: 'Категория ' + categoryId + ' - OpenForum',
      authorised: true,
      username: 'username',
    };
  }

  deleteCategory(categoryId: number) {
    throw new NotImplementedException();
  }

  editCategory(editCategoryDto: EditCategoryDto) {
    throw new NotImplementedException();
  }

  createTopic(createTopicDto: CreateTopicDto) {
    throw new NotImplementedException();
  }

  deleteTopic(topicId: number) {
    throw new NotImplementedException();
  }

  editTopic(editTopicDto: EditTopicDto) {
    throw new NotImplementedException();
  }

  getTopic(topicId: number) {
    return {
      topicId: topicId,
      title: 'Топик ' + topicId + ' - OpenForum',
      authorised: true,
      username: 'username',
    };
  }

  createPost(createPostDto: CreatePostDto) {
    throw new NotImplementedException();
  }

  deletePost(postId: number) {
    throw new NotImplementedException();
  }

  editPost(editPostDto: EditPostDto) {
    throw new NotImplementedException();
  }

  getPost(postId: number) {
    return {
      postId: postId,
      title: 'Пост ' + postId + ' - OpenForum',
      authorised: true,
      username: 'username',
    };
  }

  createComment(createCommentDto: CreateCommentDto) {
    throw new NotImplementedException();
  }

  deleteComment(commentId: number) {
    throw new NotImplementedException();
  }

  editComment(editCommentDto: EditCommentDto) {
    throw new NotImplementedException();
  }
}
