import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import prisma from '../client';

@Injectable()
export class CategoryService {
  async getSomeCategory(userId: string, page: number) {
    const take = 5;
    const user = await this._getUser(userId);

    const category = await prisma.category.findMany({
      skip: (page - 1) * take,
      take: take,
    });

    const pageCount = Math.ceil(category.length / take);
    if (page < 1 || page > pageCount) {
      throw new BadRequestException('Invalid page number');
    }

    return {
      title: 'Категории - OpenForum',
      authorised: true,
      username: user.name,
      userId: userId,
      category: category,
      pageCount: pageCount,
      page: page,
    };
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    await prisma.category.create({ data: createCategoryDto });
  }

  async deleteCategory(categoryId: number) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (category == null) {
      throw new NotFoundException('Category not found');
    }
    await prisma.category.delete({ where: { id: categoryId } });
  }

  async editCategory(categoryId: number, editCategoryDto: EditCategoryDto) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (category == null) {
      throw new NotFoundException('Category not found');
    }
    await prisma.category.update({
      where: { id: categoryId },
      data: editCategoryDto,
    });
  }

  async _getUser(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user == null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
