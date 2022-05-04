import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EditTopicDto } from './dto/edit.topic.dto';
import { CreateTopicDto } from './dto/create.topic.dto';
import prisma from '../client';

@Injectable()
export class TopicService {
  async getSomeTopics(userId: string, categoryId: number, page: number) {
    const take = 5;
    const user = await this._getUser(userId);
    const category = await this._getCategory(categoryId);

    const topics = await prisma.topic.findMany({
      skip: (page - 1) * take,
      take: take,
      where: { categoryId: categoryId },
    });

    const pageCount = Math.ceil(topics.length / take);
    if (page < 1 || page > pageCount) {
      throw new BadRequestException('Invalid page number');
    }

    return {
      title: category.name + ' - OpenForum',
      //authorised: true,
      //username: user.name,
      //userId: userId,
      categoryName: category.name,
      categoryId: categoryId,
      topics: topics,
      pageCount: pageCount,
      page: page,
    };
  }

  async createTopic(categoryId: number, createTopicDto: CreateTopicDto) {
    await this._getCategory(categoryId);
    await prisma.topic.create({ data: createTopicDto });
  }

  async deleteTopic(categoryId: number, topicId: number) {
    await this._getCategory(categoryId);
    await prisma.topic.delete({ where: { id: topicId } });
  }

  async editTopic(
    categoryId: number,
    topicId: number,
    editTopicDto: EditTopicDto,
  ) {
    await this._getCategory(categoryId);
    await this._getTopic(topicId);
    await prisma.topic.update({ where: { id: topicId }, data: editTopicDto });
  }

  async _getUser(userId: string) {
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
}
