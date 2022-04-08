import { Injectable, NotImplementedException } from '@nestjs/common';
import { EditPostDto } from './dto/edit.post.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { EditCommentDto } from './dto/edit.comment.dto';

@Injectable()
export class PostService {
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
