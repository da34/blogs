import { HttpException, Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { QueryContentDto } from './dto/query-content-dto';
import { Comment } from '../comments/entities/comment.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}
  create(createContentDto: CreateContentDto) {
    const createContent = this.contentRepository.create(createContentDto);
    return this.contentRepository.save(createContent);
  }

  async findAll(query: QueryContentDto) {
    const { page = 1, pageSize = 10 } = query;
    const dbContent = await getRepository(Content).createQueryBuilder(
      'content',
    );
    const count = await dbContent.getCount();
    dbContent.limit(pageSize);
    dbContent.offset((page - 1) * pageSize);
    const links = await dbContent.getMany();
    return { count, list: links };
  }

  findOne(id: string) {
    return this.contentRepository.findOne(id);
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    const exitsContent = await this.contentRepository.findOne(id);
    if (!exitsContent) {
      throw new HttpException(`不存在id为${id}的内容`, 401);
    }
    return this.contentRepository.merge(exitsContent, updateContentDto);
  }

  remove(id: string) {
    return this.contentRepository.delete(id);
  }
}
