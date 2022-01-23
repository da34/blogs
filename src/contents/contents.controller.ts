import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { QueryContentDto } from './dto/query-content-dto';

@ApiTags('内容')
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto);
  }

  @Get()
  findAll(@Query() query: QueryContentDto) {
    const selectCond = {
      select: [
        'id',
        'title',
        'contentOutline',
        'firstPicture',
        'isTop',
        'createTime',
      ],
      relations: ['tags'],
    };
    return this.contentsService.findAll(query, selectCond);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const selectCond = {
      select: [
        'id',
        'title',
        'content',
        'firstPicture',
        'isCommentOpen',
        'isShare',
        'likeNum',
        'createTime',
        'updateTime',
        'views',
      ],
    };
    return this.contentsService.findOne(id, selectCond);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(id, updateContentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(id);
  }
}
