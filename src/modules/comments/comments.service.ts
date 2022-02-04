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
    // 评论通过，并且有父级
    if (exitsComment.status === StatusComment.Pass && exitsComment.parentId) {
      const smtpConfig = this.configService.get('smtp');
      const siteConfig = this.configService.get('site');
      const mailOptions = {
        from: smtpConfig.from,
        to: exitsComment.replyEmail,
        subject: `「 ${siteConfig.name} 」回复通知`,
        template: join(__dirname, './templates', 'replyTemp'),
        context: {
          // Data to be sent to template engine.
          siteName: siteConfig.name,
          siteUrl: siteConfig.url,
          replyName: exitsComment.replyName,
          reviewUrl: siteConfig.url + exitsComment.anchor,
        },
        //  多余字段。给smtp存储的
        text: exitsComment.text,
      };
      this.smtpService.create(mailOptions).catch((_) => {
        console.log('评论成功，发送邮件失败');
      });
    }
    // // 发送通知站长
    // this.noticeEmail(exitsComment);
    // console.log(exitsComment, 'exitsComment')
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
