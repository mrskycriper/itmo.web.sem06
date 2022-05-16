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
    if (page < 1) {
      throw new BadRequestException('Invalid page number');
    }
    const take = 5;
    let user = null;
    if (userId != null) {
      user = await prisma.user.findUnique({ where: { id: userId } });
    }

    const categories = await prisma.category.findMany({
      skip: (page - 1) * take,
      take: take,
      orderBy: { name: 'asc' },
    });

    let pageCount = Math.ceil(categories.length / take);
    if (pageCount == 0) {
      pageCount = 1;
    }
    if (page > pageCount) {
      throw new BadRequestException('Invalid page number');
    }

    let admin = false;

    if (user) {
      if (user.isAdmin || user.isModerator) {
        admin = true;
      }
    }

    return {
      title: 'Категории - OpenForum',
      categories: categories,
      pageCount: pageCount,
      page: page,
      admin: admin,
    };
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<object> {
    const category = await prisma.category.create({ data: createCategoryDto });
    return { categoryId: category.id };
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
