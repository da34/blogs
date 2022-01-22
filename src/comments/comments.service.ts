import { HttpException, Injectable, Ip } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { QueryCommentDto } from './dto/query-comment.dto';
import { Content } from '../contents/entities/content.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const createComment = this.commentRepository.create(createCommentDto);
    const exitsComment = await this.commentRepository.save(createComment);

    await createQueryBuilder()
      .relation(Comment, 'content')
      .of(exitsComment.id)
      .set(createCommentDto.contentId);

    if (createCommentDto.tierId) {
      await createQueryBuilder()
        .relation(Comment, 'parentComment')
        .of(exitsComment.id)
        .set(createCommentDto.tierId);
    }
  }

  async findAll(query: QueryCommentDto) {
    const { page = 1, pageSize = 10, contentId } = query;
    const comments = await this.commentRepository.find({
      take: pageSize,
      skip: (page - 1) * pageSize,
      relations: ['childComments'],
      where: {
        parentComment: null,
        content: contentId,
      },
      order: { createTime: 'DESC' },
    });

    const count = await this.commentRepository.count({
      where: { content: contentId },
    });
    return { count, list: comments };
  }

  findOne(id: string) {
    return this.commentRepository.findOne(id);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const exitsComment = await this.commentRepository.findOne(id);
    if (!exitsComment) {
      throw new HttpException(`不存在id为${id}的评论`, 401);
    }
    return this.commentRepository.merge(exitsComment, updateCommentDto);
  }

  remove(id: string) {
    return this.commentRepository.delete(id);
  }
}
