import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { EditCategoryDto } from './dto/edit.category.dto';
import { TimerInterceptor } from '../timer-interceptor.service';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { SessionDecorator } from '../auth/session.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('category')
@UseInterceptors(TimerInterceptor)
@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Get categories list' })
  @ApiQuery({
    name: 'page',
    type: 'string',
    description: 'Page selector',
  })
  @ApiOkResponse({ description: 'OK' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('categories')
  @Render('categories')
  async getSomeCategory(
    @SessionDecorator() session: SessionContainer,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<object> {
    let userId = null;
    try {
      userId = session.getUserId();
    } catch (err) {}
    return await this.categoryService.getSomeCategory(userId, page);
  }

  @ApiOperation({ summary: 'Create new category' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AdminGuard)
  @Post('categories')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<object> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Delete single category' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description: 'Unique category identifier',
  })
  @ApiOkResponse({ description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @UseGuards(AdminGuard)
  @Delete('categories/:categoryId')
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
  @ApiOkResponse({ description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @UseGuards(AdminGuard)
  @Put('categories/:categoryId')
  async editCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() editCategoryDto: EditCategoryDto,
  ) {
    return await this.categoryService.editCategory(categoryId, editCategoryDto);
  }
}
