import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../users/entities/user.entity';
import { QueryContentDto } from './dto/query-content-dto';
import { DbOptions } from '../../decorator/dbOptions.decorator';
import { filterXSS } from 'xss';
import { Auth } from '../../decorator/auth.decorator';

@ApiTags('内容')
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Auth([UserRole.Admin])
  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    // xss
    createContentDto.title = filterXSS(createContentDto.title);
    // createContentDto.content = filterXSS(createContentDto.content);
    // createContentDto.description = filterXSS(createContentDto.description);
    return this.contentsService.create(createContentDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Query() query: QueryContentDto) {
    return this.contentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @DbOptions() dbOptions) {
    return this.contentsService.findOne(id, dbOptions);
  }

  @Auth([UserRole.Admin])
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(id, updateContentDto);
  }

  @Auth([UserRole.Admin])
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contentsService.remove(id);
  }

  @Post(':id/views')
  updateViewsById(@Param('id') id) {
    return this.contentsService.updateViewsById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/search')
  searchArticles(@Query() query) {
    const { keyword = '', tagName = [], categoryName = '' } = query;
    // console.log(keyword, tagName, categoryName);
    return this.contentsService.search(keyword, tagName, categoryName);
  }

  @Get('archive')
  getArchive() {
    return this.contentsService.getArchive();
  }
}
