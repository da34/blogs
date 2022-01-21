import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { getRepository, Repository } from 'typeorm';
import { QueryCommentDto } from './dto/query-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    const createComment = this.commentRepository.create(createCommentDto);
    return this.commentRepository.save(createComment);
  }

  async findAll(query: QueryCommentDto) {
    const { page = 1, pageSize = 10 } = query;
    const dbComment = await getRepository(Comment).createQueryBuilder(
      'comment',
    );
    const count = await dbComment.getCount();
    dbComment.limit(pageSize);
    dbComment.offset((page - 1) * pageSize);
    const links = await dbComment.getMany();
    return { count, list: links };
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
