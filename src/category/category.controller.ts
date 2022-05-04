import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Render,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import { TimerInterceptor } from '../timer-interceptor.service';

@ApiTags('category')
@UseInterceptors(TimerInterceptor)
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get category list' })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    description: 'Temporary way to insert userid',
  })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Page selector',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get('category')
  @Render('category-list')
  async getSomeCategory(
    @Query('userId') userId: string,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<object> {
    return await this.categoryService.getSomeCategory(userId, page);
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @Post('category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Delete single category' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category identifier',
  })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Delete('category/:categoryId')
  async deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.deleteCategory(categoryId);
  }

  @ApiOperation({ summary: 'Edit single category' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category identifier',
  })
  @ApiBody({ type: EditCategoryDto })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Put('category/:categoryId')
  async editCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() editCategoryDto: EditCategoryDto,
  ) {
    return await this.categoryService.editCategory(categoryId, editCategoryDto);
  }
}
