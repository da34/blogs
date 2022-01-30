import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
    createContentDto.content = filterXSS(createContentDto.content);
    createContentDto.contentOutline = filterXSS(
      createContentDto.contentOutline,
    );
    return this.contentsService.create(createContentDto);
  }

  @Get()
  findAll(@Query() query: QueryContentDto, @DbOptions() dbOptions) {
    return this.contentsService.findAll(query, dbOptions);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string, @DbOptions() dbOptions) {
    return this.contentsService.findOne(id, dbOptions);
  }

  @Auth([UserRole.Admin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(id, updateContentDto);
  }

  @Auth([UserRole.Admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(id);
  }

  @Post(':id/views')
  updateViewsById(@Param('id') id) {
    return this.contentsService.updateViewsById(id);
  }

  @Get('/tag/:name')
  findArticlesByTag(@Param('name') tagName) {
    return this.contentsService.findByTag(tagName);
  }

  @Get('archive')
  getArchive(@Query('tag') tag: string) {
    return this.contentsService.getArchive(tag);
  }
}
