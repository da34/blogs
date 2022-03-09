import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment, StatusComment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { QueryCommentDto } from './dto/query-comment.dto';
import { Content } from '../contents/entities/content.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { SmtpService } from '../smtp/smtp.service';
import { User, UserRole } from '../users/entities/user.entity';
import { filterXSS } from 'xss';
import { JwtService } from '@nestjs/jwt';
import { ExternalService } from '../external/external.service';
import { join } from 'path';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    private configService: ConfigService,
    private httpService: HttpService,
    private smtpService: SmtpService,
    private jwtService: JwtService,
    private externalService: ExternalService,
  ) {}
  async create(ip, ua, token, createCommentDto: CreateCommentDto) {
    // console.log(res.render, 'res.render');
    createCommentDto.ip = ip;
    createCommentDto.ua = ua;
    createCommentDto.isAdmin = false; // 统一false，防止前端直接传值
    if (token) {
      const { role, username } = this.jwtService.decode(token) as User;
      createCommentDto.isAdmin = role === UserRole.Admin;
      createCommentDto.name = username;
    }

    // xss过滤
    createCommentDto.text = filterXSS(createCommentDto.text);
    createCommentDto.name = filterXSS(createCommentDto.name);

    // 判断评论所属资源是否开启评论
    const exitsContent = await this.contentRepository.findOne(
      createCommentDto.postId,
    );
    if (exitsContent && !exitsContent.isCommentOpen) {
      throw new HttpException('非法评论', HttpStatus.FORBIDDEN);
    }

    // 文本检测
    const { result } = await this.externalService.checkText(
      createCommentDto.text,
    );
    createCommentDto.status = result?.suggestion;
    createCommentDto.suggestion = JSON.stringify(result?.detail);

    // 保存到数据库
    const createComment = this.commentRepository.create(createCommentDto);
    const exitsComment = await this.commentRepository.save(createComment);
    if (StatusComment.Pass !== exitsComment.status) {
      throw new HttpException(
        '评论包含敏感信息，已屏蔽！',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const siteConfig = this.configService.get('site');
    const smtpConfig = this.configService.get('smtp');
    // 评论通过
    if (exitsComment.status === StatusComment.Pass) {
      const mailOptions = {
        from: smtpConfig.from,
        to: exitsComment.replyEmail,
        subject: `「 ${siteConfig.name} 」回复通知`,
        template: '/replyTemp',
        context: {
          // Data to be sent to template engine.
          text: exitsComment.text,
          siteName: siteConfig.name,
          siteUrl: siteConfig.url,
          name: exitsComment.name,
          replyName: exitsComment.replyName,
          reviewUrl: siteConfig.url + exitsComment.anchor,
        },
        //  多余字段。给smtp存储的
        text: exitsComment.text,
        fromEmail: exitsComment.email || smtpConfig.from, // 这里发送人邮箱
        toEmail: exitsComment.replyEmail, // 这里收件人的邮箱
      };
      // 回复他人，发送邮件通知
      if (exitsComment.parentId) {
        this.smtpService.create(mailOptions).catch((_) => {
          console.log('评论成功，发送邮件失败');
        });
      }
      // 通知站长
      if (!exitsComment.isAdmin) {
        const siteMailOption = Object.assign(mailOptions, {
          to: siteConfig.email,
          subject: `「 ${siteConfig.name} 」评论通知`,
          template: '/noticeTemp',
          toEmail: siteConfig.email, // 配置的站长邮箱
        });
        this.smtpService.create(siteMailOption).catch((_) => {
          console.log('通知站长，评论成功，发送邮件失败');
        });
      }
    }
    return exitsComment;
  }

  async findAll(query: QueryCommentDto) {
    const { page = 1, pageSize = 10, status, sortBy, ...otherQuery } = query;
    const commentQuery = await this.commentRepository
      .createQueryBuilder('comment')
      .take(pageSize)
      .skip((page - 1) * pageSize);
    // .orderBy('comment.createTime', 'DESC');

    if (status) {
      commentQuery.andWhere('comment.status=:status', { status });
    }

    if (sortBy) {
      Object.keys(sortBy).forEach((key) =>
        commentQuery.orderBy(`comment.${key}`, sortBy[key]),
      );
    } else {
      commentQuery.orderBy('comment.createTime', 'DESC');
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
      .andWhere('comment.status=:status', { status: StatusComment.Pass });

    const total = await query.getCount();

    query
      .andWhere('comment.parentId is NULL')
      .orderBy('comment.createTime', 'DESC');

    const subQuery = this.commentRepository
      .createQueryBuilder('comment')
      .andWhere('comment.status=:status', { status: StatusComment.Pass })
      .andWhere('comment.parentId=:parentId')
      .orderBy('comment.createTime', 'DESC');

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

    return { count, list: data, total };
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

    // todo 更新评论，发送通知
    if (updateComment.status === StatusComment.Pass && updateComment.parentId) {
    }
    return this.commentRepository.save(updateComment);
  }

  remove(id: string) {
    return this.commentRepository.delete(id);
  }
}
