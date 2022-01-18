import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly classifyService: CategoryService) {}

  @Post()
  create(@Body() createClassifyDto: CreateCategoryDto) {
    return this.classifyService.create(createClassifyDto);
  }

  @Get()
  findAll() {
    return this.classifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classifyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassifyDto: UpdateCategoryDto,
  ) {
    return this.classifyService.update(+id, updateClassifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classifyService.remove(+id);
  }
}
