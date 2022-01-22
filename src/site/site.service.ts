import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categories/entities/category.entity';
import { Content } from '../contents/entities/content.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Content)
    private contentRep: Repository<Content>,
    @InjectRepository(Tag)
    private tagRep: Repository<Tag>,
    @InjectRepository(Category)
    private categoryRep: Repository<Category>,
  ) {}
  async findAll() {
    const data = {
      tagCount: 0,
      categoryCount: 0,
      contentCount: 0,
    };
    data.tagCount = await this.tagRep.count();
    data.categoryCount = await this.categoryRep.count();
    data.contentCount = await this.contentRep.count();
    return data;
  }
  async getArchive() {
    const allContents = await this.contentRep.find({
      select: ['id', 'title', 'createTime'],
      order: { createTime: 'DESC' },
      where: {
        status: 'publish',
        type: 'article',
      },
    });
    const data = [];
    let yearList = [];
    const rowsLen = allContents.length;
    for (let i = 0; i < allContents.length; i++) {
      yearList.push(dayjs(+allContents[i].createTime).format('YYYY'));
    }
    yearList = [...new Set(yearList)];
    // 整理数据返回前端
    for (let i = 0; i < yearList.length; i++) {
      const obj = {
        year: yearList[i],
        list: [],
      };
      // console.log(yearList[i]);
      for (let j = 0; j < rowsLen; j++) {
        // 年份相同放入一个对象
        if (yearList[i] === dayjs(+allContents[j].createTime).format('YYYY')) {
          obj.list.push(allContents[j]);
        }
      }
      data.push(obj);
    }

    return data;
  }
}
