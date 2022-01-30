import { HttpException, Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  createQueryBuilder,
  FindConditions,
  getRepository,
  In,
  Repository,
} from 'typeorm';
import { Content, StatusContent, TypeContent } from './entities/content.entity';
import { QueryContentDto } from './dto/query-content-dto';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categories/entities/category.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createContentDto: CreateContentDto) {
    // 查询 category
    const exitsCategory = await this.categoryRepository.findOne(
      createContentDto.categoryId,
    );
    if (!exitsCategory) {
      throw new HttpException(
        `不存在id为${createContentDto.categoryId}的分类`,
        401,
      );
    }
    // 查询tags
    const exitsTags = await this.tagRepository.find({
      id: In(createContentDto.tagsId),
    });

    const createContent = this.contentRepository.create(createContentDto);
    createContent.category = exitsCategory;
    createContent.tags = exitsTags;
    await this.contentRepository.save(createContent);
  }

  async findAll(query?: QueryContentDto, selectCond?: FindConditions<any>) {
    const { page = 1, pageSize = 10 } = query;
    const contents = await this.contentRepository.find(
      Object.assign(
        {
          take: pageSize,
          skip: (page - 1) * pageSize,
          relations: ['tags', 'category'],
          order: { createTime: 'DESC' },
        },
        selectCond,
      ),
    );

    const count = await this.contentRepository.count(selectCond.where);
    return { count, list: contents };
  }

  findOne(id: string, selectCond?: FindConditions<any>) {
    return this.contentRepository.findOne(
      id,
      Object.assign(
        {
          relations: ['tags', 'category'],
        },
        selectCond,
      ),
    );
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    const { tagsId, categoryId } = updateContentDto;
    const exitsContent = await this.contentRepository.findOne(id);

    if (!exitsContent) {
      throw new HttpException(`不存在id为${id}的内容`, 401);
    }
    const updateContent = this.contentRepository.merge(
      exitsContent,
      updateContentDto,
    );

    // 查询 category
    // if (categoryId) {
    updateContent.category =
      (categoryId && (await this.categoryRepository.findOne(categoryId))) ||
      null;
    updateContent.tags = await this.tagRepository.find({
      id: In(tagsId),
    });

    return this.contentRepository.save(updateContent);
  }

  async remove(id: string) {
    const exitsContent = await this.contentRepository.findOne(id);
    if (!exitsContent) {
      throw new HttpException(`不存在id为${id}的内容`, 401);
    }
    return this.contentRepository.delete(id);
  }

  async updateViewsById(id: string) {
    const oldArticle = await this.contentRepository.findOne(id);
    const updatedArticle = await this.contentRepository.merge(oldArticle, {
      views: oldArticle.views + 1,
    });
    return this.contentRepository.save(updatedArticle);
  }
  async getArchive(tagName?: string) {
    // const allContents = await this.contentRepository.find({
    //   select: ['id', 'title', 'createTime'],
    //   order: { createTime: 'DESC' },
    //   where: {
    //     status: 'publish',
    //     type: 'article',
    //   },
    // });
    const query = getRepository(Content)
      .createQueryBuilder('content')
      .where('content.status = :status', { status: StatusContent.Publish })
      .andWhere('content.type = :type', { type: TypeContent.Article })
      .orderBy('content.createTime', 'DESC')
      .select(['content.id', 'content.title', 'content.createTime'])
      .leftJoinAndSelect('content.tags', 'tags');

    if (tagName) {
      query.andWhere('tags.name =:name ', { name: tagName });
    }

    const allContents = await query.getMany();

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

  findByTag(tagId: string) {}
}
