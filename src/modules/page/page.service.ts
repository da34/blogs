import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { FindConditions, Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryLinkDto } from '../links/dto/query-link-dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
  ) {}

  async create(createPageDto: CreatePageDto) {
    const { path } = createPageDto;
    const exist = await this.pageRepository.findOne({ where: { path } });

    if (exist) {
      throw new HttpException('页面已存在', HttpStatus.BAD_REQUEST);
    }

    const createPage = await this.pageRepository.create(createPageDto);
    await this.pageRepository.save(createPage);
    return createPage;
  }

  async findAll(query: QueryLinkDto) {
    const { page = 1, pageSize = 10, status, ...otherQuery } = query;

    const linkQuery = await this.pageRepository
      .createQueryBuilder('page')
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .orderBy('page.order', 'DESC');

    if (status) {
      linkQuery.andWhere('page.status=:status', { status });
    }

    if (otherQuery) {
      Object.keys(otherQuery).forEach((q) =>
        linkQuery.andWhere(`page.${q} LIKE :${q}`, {
          [`${q}`]: `%${otherQuery[q]}%`,
        }),
      );
    }

    const count = await linkQuery.getCount();
    return {
      count,
      list: await linkQuery.getMany(),
    };
  }

  findOne(id: string) {
    const query = this.pageRepository
      .createQueryBuilder('page')
      .where('page.id=:id')
      .orWhere('page.path=:path')
      .setParameter('id', id)
      .setParameter('path', id);

    return query.getOne();
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    const old = await this.pageRepository.findOne(id);
    const { status } = updatePageDto;

    const newPage = {
      ...updatePageDto,
      publishAt: status === 'publish' ? Date.now() : old && old.publishAt,
    };

    const updatedPage = await this.pageRepository.merge(old, newPage);
    return this.pageRepository.save(updatedPage);
  }

  async updateViewsById(id: string): Promise<Page> {
    const old = await this.pageRepository.findOne(id);
    const newData = await this.pageRepository.merge(old, {
      views: old.views + 1,
    });
    return this.pageRepository.save(newData);
  }

  async remove(id: string) {
    const page = await this.pageRepository.findOne(id);
    return this.pageRepository.remove(page);
  }
}
