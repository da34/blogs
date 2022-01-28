import { HttpException, Injectable, Ip } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, StatusComment } from './entities/comment.entity';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { QueryCommentDto } from './dto/query-comment.dto';
import { Content } from '../contents/entities/content.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Link } from '../links/entities/link.entity';

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

    // 评论通过，并且有父级
    if (exitsComment.status === StatusComment.Pass && exitsComment.pid) {
      this.sendEmail(exitsComment);
    }
    // 发送通知站长
    this.noticeEmail(exitsComment);
  }

  async findAll(query: QueryCommentDto, selectCond?: FindConditions<any>) {
    const { page = 1, pageSize = 10 } = query;
    const comments = await this.commentRepository.find(
      Object.assign(
        {
          take: pageSize,
          skip: (page - 1) * pageSize,
          relations: ['childComments'],
          order: { createTime: 'DESC' },
        },
        selectCond,
      ),
    );

    const count = await this.commentRepository.count(selectCond.where);
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
    const updateComment = this.commentRepository.merge(
      exitsComment,
      updateCommentDto,
    );
    // 评论通过，并且有父级
    if (updateComment.status === StatusComment.Pass && updateComment.pid) {
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
      pName: parentComment.nickName,
      pText: parentComment.text,
      name: comment.nickName,
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
