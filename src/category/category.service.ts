import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import { CreateTopicDto } from '../topic/dto/create.topic.dto';

@Injectable()
export class CategoryService {
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
}
