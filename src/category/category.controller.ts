import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import { CreateTopicDto } from '../topic/dto/create.topic.dto';

@ApiTags('category')
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Renders category list' })
  @ApiResponse({
    status: 200,
    description: 'Category list rendered.',
  })
  @Get('category')
  @Render('category-list')
  async getAllCategory(): Promise<object> {
    return this.categoryService.getAllCategory();
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiParam({ name: 'createCategoryDto', type: 'CreateCategoryDto' })
  @ApiResponse({
    status: 201,
    description: 'Category created.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @Post('category')
  async createCategory(
    @Body('createCategoryDto') createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Renders single category' })
  @ApiParam({ name: 'categoryId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Category rendered.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Get('category/:categoryId')
  @Render('category')
  async getCategory(@Param('categoryId') categoryId: number) {
    return this.categoryService.getCategory(categoryId);
  }

  @ApiOperation({ summary: 'Delete single category' })
  @ApiParam({ name: 'categoryId', type: 'number' })
  @ApiResponse({
    status: 204,
    description: 'Category deleted.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Delete('category/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }

  @ApiOperation({ summary: 'Edit single category' })
  @ApiParam({ name: 'editCategoryDto', type: 'EditCategoryDto' })
  @ApiResponse({
    status: 201,
    description: 'Category edited.',
  })
  @ApiResponse({
    status: 403,
    description: 'Access forbidden.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Put('category/:categoryId')
  async editCategory(
    @Body('editCategoryDto') editCategoryDto: EditCategoryDto,
  ) {
    return this.categoryService.editCategory(editCategoryDto);
  }

  @ApiOperation({ summary: 'Create new topic' })
  @ApiParam({ name: 'createTopicDto', type: 'CreateTopicDto' })
  @ApiResponse({
    status: 201,
    description: 'Topic created.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Post('category/:categoryId/topics')
  async createTopic(@Body('createTopicDto') createTopicDto: CreateTopicDto) {
    return this.categoryService.createTopic(createTopicDto);
  }
}
