import { HttpException, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { getRepository, Repository } from 'typeorm';
import { QueryLinkDto } from './dto/query-link-dto';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  create(createLinkDto: CreateLinkDto): Promise<Link> {
    const createLink = this.linkRepository.create(createLinkDto);
    return this.linkRepository.save(createLink);
  }

  async findAll(query: QueryLinkDto) {
    const { page = 1, pageSize = 10 } = query;
    const dbLink = await getRepository(Link).createQueryBuilder('link');
    const count = await dbLink.getCount();
    dbLink.limit(pageSize);
    dbLink.offset((page - 1) * pageSize);
    const links = await dbLink.getMany();
    return { count, list: links };
  }

  findOne(id: number) {
    return this.linkRepository.findOne(id);
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    const existLink = await this.linkRepository.findOne(id);
    if (!existLink) {
      throw new HttpException(`id为${id}的友联不存在`, 401);
    }
    const updateLink = this.linkRepository.merge(existLink, updateLinkDto);
    return this.linkRepository.save(updateLink);
  }

  async remove(id: number) {
    const existLink = await this.linkRepository.findOne(id);
    if (!existLink) {
      throw new HttpException(`id为${id}的友联不存在`, 401);
    }
    return await this.linkRepository.remove(existLink);
  }
}
