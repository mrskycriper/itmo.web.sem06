import { Injectable, NotImplementedException } from '@nestjs/common';
import { EditTopicDto } from './dto/edit.topic.dto';
import { CreatePostDto } from '../post/dto/create.post.dto';

@Injectable()
export class TopicService {
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
}
