import { HttpException, Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, In, Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { QueryContentDto } from './dto/query-content-dto';
import { Tag } from '../tags/entities/tag.entity';
import { Category } from '../categories/entities/category.entity';
import { Link } from '../links/entities/link.entity';

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
    const exitsContent = await this.contentRepository.findOne(id);
    if (!exitsContent) {
      throw new HttpException(`不存在id为${id}的内容`, 401);
    }
    // 查询 category
    const exitsCategory = await this.categoryRepository.findOne(
      updateContentDto.categoryId,
    );
    if (!exitsCategory) {
      throw new HttpException(
        `不存在id为${updateContentDto.categoryId}的分类`,
        401,
      );
    }
    // 查询tags
    const exitsTags = await this.tagRepository.find({
      id: In(updateContentDto.tagsId),
    });

    const updateContent = this.contentRepository.merge(
      exitsContent,
      updateContentDto,
    );

    updateContent.category = exitsCategory;
    updateContent.tags = exitsTags;
    return this.contentRepository.save(updateContent);
  }

  async remove(id: string) {
    const exitsContent = await this.contentRepository.findOne(id);
    if (!exitsContent) {
      throw new HttpException(`不存在id为${id}的内容`, 401);
    }
    return this.contentRepository.delete(id);
  }
}
