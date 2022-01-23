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
  Ip,
  Req,
  HttpException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { QueryCommentDto } from './dto/query-comment.dto';
import { createHash } from 'crypto';
import { ExternalService } from '../external/external.service';
import { StatusComment } from './entities/comment.entity';
import { ContentsService } from '../contents/contents.service';
const md5 = (str) => createHash('md5').update(str).digest('hex');

@ApiTags('评论')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private externalService: ExternalService,
  ) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Ip() ip,
    @Req() req,
  ) {
    createCommentDto.ip = ip;
    createCommentDto.ua = req.headers['user-agent'];
    // 把邮箱是qq 替换成qq 头像
    if (/@qq.com/.test(createCommentDto.email)) {
      createCommentDto.avatar = `https://q1.qlogo.cn/g?b=qq&nk=${
        createCommentDto.email.split('@')[0]
      }&s=100`;
    } else {
      createCommentDto.avatar = `https://gravatar.loli.net/avatar/${md5(
        createCommentDto.email,
      )}?s=52&d=retro`;
    }

    // 文本检测
    const { result } = await this.externalService.checkText(
      createCommentDto.text,
    );
    createCommentDto.status = result.suggestion;

    createCommentDto.suggestion = JSON.stringify(result.detail);

    if (createCommentDto.status !== StatusComment.Pass) {
      throw new HttpException('评论包含敏感信息，已屏蔽！', 412);
    }
    await this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() query: QueryCommentDto) {
    return this.commentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}

@Controller('comment')
export class AdminCommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('new')
  getByCreateTime() {
    const query = { pageSize: 5 };
    const selectCond = {
      select: ['id', 'text', 'createTime', 'avatar', 'nickName'],
      relations: [],
      where: {
        status: StatusComment.Pass,
      },
    };
    return this.commentsService.findAll(query, selectCond);
  }
}
