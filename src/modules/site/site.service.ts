import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categories/entities/category.entity';
import { Content, StatusContent } from '../contents/entities/content.entity';
import { Comment, StatusComment } from '../comments/entities/comment.entity';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Content)
    private contentRep: Repository<Content>,
    @InjectRepository(Tag)
    private tagRep: Repository<Tag>,
    @InjectRepository(Category)
    private categoryRep: Repository<Category>,
    @InjectRepository(Comment)
    private commentRep: Repository<Comment>,
  ) {}
  async findAll() {
    const data = {
      tagCount: 0,
      categoryCount: 0,
      contentCount: 0,
    };
    data.tagCount = await this.tagRep.count();
    data.categoryCount = await this.categoryRep.count();
    data.contentCount = await this.contentRep.count({
      where: { status: StatusContent.Publish },
    });
    return data;
  }

  async getInfo() {
    const data = {
      commentCount: 0,
    };
    data.commentCount = await this.commentRep.count({
      where: { status: StatusComment.Pass },
    });
    return data;
  }
}
