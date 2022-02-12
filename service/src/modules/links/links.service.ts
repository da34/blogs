import { HttpException, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { FindConditions, Repository } from 'typeorm';
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

  async findAll(query: QueryLinkDto, selectCond?: FindConditions<any>) {
    const { page = 1, pageSize = 10 } = query;
    const links = await this.linkRepository.find(
      Object.assign(
        {
          skip: (page - 1) * pageSize,
          take: pageSize,
        },
        selectCond,
      ),
    );
    const count = await this.linkRepository.count(selectCond.where);
    return { count, list: links };
  }

  findOne(id: string) {
    return this.linkRepository.findOne(id);
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    const existLink = await this.linkRepository.findOne(id);
    if (!existLink) {
      throw new HttpException(`id为${id}的友联不存在`, 401);
    }
    const updateLink = this.linkRepository.merge(existLink, updateLinkDto);
    return this.linkRepository.save(updateLink);
  }

  async remove(id: string) {
    const existLink = await this.linkRepository.findOne(id);
    if (!existLink) {
      throw new HttpException(`id为${id}的友联不存在`, 401);
    }
    return await this.linkRepository.remove(existLink);
  }
}
