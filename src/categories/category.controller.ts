import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, Query
} from "@nestjs/common";
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { QueryContentDto } from "../contents/dto/query-content-dto";
import { DbOptions } from "../common/decorator/dbOptions.decorator";

@ApiTags('分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly classifyService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassifyDto: UpdateCategoryDto,
  ) {
    return this.classifyService.update(id, updateClassifyDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classifyService.remove(id);
  }
}
