import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, StatusComment } from './entities/comment.entity';
import { FindConditions, Repository } from 'typeorm';
import { QueryCommentDto } from './dto/query-comment.dto';
import { Content } from '../contents/entities/content.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const createComment = this.commentRepository.create(createCommentDto);
    const exitsComment = await this.commentRepository.save(createComment);

    // console.log(exitsComment);

    // 评论通过，并且有父级
    if (exitsComment.status === StatusComment.Pass && exitsComment.parentId) {
      this.sendEmail(exitsComment);
    }
    // 发送通知站长
    this.noticeEmail(exitsComment);
  }

  async findAll(query: QueryCommentDto) {
    const { page = 1, pageSize = 10, status, ...otherQuery } = query;
    const commentQuery = await this.commentRepository
      .createQueryBuilder('comment')
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .orderBy('comment.createTime', 'DESC');

    if (status) {
      commentQuery.andWhere('comment.status=:status', { status });
    }

    if (otherQuery) {
      Object.keys(otherQuery).forEach((q) =>
        commentQuery.andWhere(`comment.${q} LIKE :${q}`, {
          [`${q}`]: `%${otherQuery[q]}%`,
        }),
      );
    }

    const count = await commentQuery.getCount();
    return {
      count,
      list: await commentQuery.getMany(),
    };
  }

  async getCommentsByPost(postId, queryParams) {
    const query = this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.postId=:postId', { postId })
      .andWhere('comment.status=:status', { status: StatusComment.Pass })
      .andWhere('comment.parentId is NULL')
      .orderBy('comment.createTime', 'DESC');

    const subQuery = this.commentRepository
      .createQueryBuilder('comment')
      .andWhere('comment.status=:status', { status: StatusComment.Pass })
      .andWhere('comment.parentId=:parentId')
      .orderBy('comment.createTime', 'ASC');

    const { page = 1, pageSize = 10 } = queryParams;
    query.skip((page - 1) * pageSize);
    query.take(pageSize);
    const [data, count] = await query.getManyAndCount();

    for (const item of data) {
      const subComments = await subQuery
        .setParameter('parentId', item.id)
        .getMany();
      Object.assign(item, { children: subComments });
    }

    return { count, list: data };
  }

  findOne(id: string) {
    return this.commentRepository.findOne(id);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const exitsComment = await this.commentRepository.findOne(id);
    if (!exitsComment) {
      throw new HttpException(`不存在id为${id}的评论`, 401);
    }
    const updateComment = this.commentRepository.merge(
      exitsComment,
      updateCommentDto,
    );
    // 评论通过，并且有父级
    if (updateComment.status === StatusComment.Pass && updateComment.parentId) {
      this.sendEmail(updateComment);
    }
    return this.commentRepository.save(updateComment);
  }

  remove(id: string) {
    return this.commentRepository.delete(id);
  }
  async sendEmail(comment) {
    const pid = comment.pid;
    // 查询父级
    const parentComment = await this.commentRepository.findOne({
      where: { id: pid },
    });
    const sendParams = {
      siteName: this.configService.get('SITE_NAME'),
      siteUrl: this.configService.get('SITE_URL'),
      pName: parentComment.name,
      pText: parentComment.text,
      name: comment.replayName,
      text: comment.text,
      toEmail: parentComment.email,
      isSend: true,
      reviewUrl: `${this.configService.get('SITE_URL')}${
        parentComment.anchor
      }#${parentComment.id}`,
    };
    const dataOb = await this.httpService.post(
      'https://qc6hsn.api.cloudendpoint.cn/hello',
      sendParams,
    );
    await lastValueFrom(dataOb);
  }

  async noticeEmail(comment) {
    const sendParams = {
      siteName: this.configService.get('SITE_NAME'),
      name: comment.nickName,
      text: comment.text,
      toEmail: this.configService.get('SITE_EMAIL'),
      isSend: false,
      subject: `有人在${this.configService.get('SITE_NAME')}评论了`,
      reviewUrl: `${this.configService.get('SITE_URL')}${comment.anchor}#${
        comment.id
      }`,
    };
    const dataOb = await this.httpService.post(
      'https://qc6hsn.api.cloudendpoint.cn/hello',
      sendParams,
    );
    await lastValueFrom(dataOb);
  }
}
