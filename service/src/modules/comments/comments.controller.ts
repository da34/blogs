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
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../users/entities/user.entity';
import { QueryCommentDto } from './dto/query-comment.dto';
import { Auth } from '../../decorator/auth.decorator';

@ApiTags('评论')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Ip() ip,
    @Req() req,
  ) {
    const token = req.headers?.authorization?.split(' ')?.pop();
    const userAgent = req.headers['user-agent'];
    return this.commentsService.create(ip, userAgent, token, createCommentDto);
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
