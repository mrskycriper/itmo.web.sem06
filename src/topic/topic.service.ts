import { BadRequestException, Injectable } from '@nestjs/common';
import { EditTopicDto } from './dto/edit.topic.dto';
import { CreateTopicDto } from './dto/create.topic.dto';
import prisma from '../client';

@Injectable()
export class TopicService {
  async getSomeTopics(userId: string, categoryId: number, page: number) {
    if (page < 1) {
      throw new BadRequestException('Invalid page number');
    }
    const take = 5;
    let edit = false;
    if (userId != null) {
      edit = true;
    }
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    const topics = await prisma.topic.findMany({
      skip: (page - 1) * take,
      take: take,
      where: { categoryId: categoryId },
    });

    const pageCount = Math.ceil(topics.length / take);
    if (page > pageCount) {
      throw new BadRequestException('Invalid page number');
    }

    return {
      title: category.name + ' - OpenForum',
      categoryName: category.name,
      categoryId: category.id,
      topics: topics,
      pageCount: pageCount,
      page: page,
      edit: edit,
    };
  }

  async createTopic(createTopicDto: CreateTopicDto) {
    await prisma.topic.create({ data: createTopicDto });
  }

  async deleteTopic(topicId: number) {
    await prisma.topic.delete({ where: { id: topicId } });
  }

  async editTopic(topicId: number, editTopicDto: EditTopicDto) {
    await prisma.topic.update({ where: { id: topicId }, data: editTopicDto });
  }
}
