import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
  Req,
  HttpException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { User, UserRole } from '../users/entities/user.entity';
import { QueryCommentDto } from './dto/query-comment.dto';
import { ExternalService } from '../external/external.service';
import { StatusComment } from './entities/comment.entity';
import { DbOptions } from '../../decorator/dbOptions.decorator';
import { filterXSS } from 'xss';
import { md5 } from '../../utils';
import { Auth } from '../../decorator/auth.decorator';
import { JwtService } from '@nestjs/jwt';

@ApiTags('评论')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private externalService: ExternalService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Ip() ip,
    @Req() req,
  ) {
    createCommentDto.ip = ip;
    createCommentDto.ua = req.headers['user-agent'];
    createCommentDto.isAdmin = false; // 统一false
    // 如果是管理员。校验token
    const token = req.headers?.authorization?.split(' ')?.pop();
    if (token) {
      const { role, username } = this.jwtService.decode(token) as User;
      if (role === UserRole.Admin) {
        createCommentDto.isAdmin = true;
        createCommentDto.name = username;
      }
    }

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

    // xss过滤
    createCommentDto.text = filterXSS(createCommentDto.text);
    createCommentDto.name = filterXSS(createCommentDto.name);
    createCommentDto.suggestion = JSON.stringify(result.detail);

    this.commentsService.create(createCommentDto);
    if (createCommentDto.status !== StatusComment.Pass) {
      throw new HttpException('评论包含敏感信息，已屏蔽！', 412);
    }
  }

  @Get()
  findAll(@Query() query: QueryCommentDto) {
    return this.commentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Auth([UserRole.Admin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Auth([UserRole.Admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }

  @Get('content/:id')
  getCommentByPost(@Param('id') id, @Query() queryParams) {
    return this.commentsService.getCommentsByPost(id, queryParams);
  }
}
