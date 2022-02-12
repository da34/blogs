import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../users/entities/user.entity';
import { QueryContentDto } from '../contents/dto/query-content-dto';
import { DbOptions } from '../../decorator/dbOptions.decorator';
import { Auth } from '../../decorator/auth.decorator';

@ApiTags('分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly classifyService: CategoryService) {}

  @Auth([UserRole.Admin])
  @Post()
  create(@Body() createClassifyDto: CreateCategoryDto) {
    return this.classifyService.create(createClassifyDto);
  }

  @Get()
  findAll(@Query() query: QueryContentDto, @DbOptions() dbOptions) {
    return this.classifyService.findAll(query, dbOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classifyService.findOne(id);
  }

  @Auth([UserRole.Admin])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassifyDto: UpdateCategoryDto,
  ) {
    return this.classifyService.update(id, updateClassifyDto);
  }

  @Auth([UserRole.Admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classifyService.remove(id);
  }
}
