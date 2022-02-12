import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}
  create(createTagDto: CreateTagDto) {
    const createTag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(createTag);
  }

  async findAll(query, selectCond) {
    const { page = 1, pageSize = 10 } = query;
    const tags = await this.tagRepository.find(
      Object.assign(
        {
          take: pageSize,
          skip: (page - 1) * pageSize,
        },
        selectCond,
      ),
    );
    const count = await this.tagRepository.count(selectCond.where);
    return {
      count,
      list: tags,
    };
  }

  findOne(id: string) {
    return this.tagRepository.findOne(id);
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const exitsTag = await this.tagRepository.findOne(id);
    if (!exitsTag) {
      throw new HttpException(`不存在id为${id}的标签`, 401);
    }
    const updateTag = this.tagRepository.merge(exitsTag, updateTagDto);
    return this.tagRepository.save(updateTag);
  }

  async remove(id: string) {
    const tag = await this.tagRepository.findOne(id);
    tag.contents = [];
    return this.tagRepository.remove(tag);
  }

  async getRelation() {
    const tags = await getRepository(Tag)
      .createQueryBuilder('tags')
      .leftJoinAndSelect('tags.contents', 'contents')
      .select(['contents.id', 'tags.name', 'tags.id'])
      .getMany();
    return tags.map((tag) => {
      tag['value'] = tag.contents.length;
      delete tag['contents'];
      return tag;
    });
  }
}
