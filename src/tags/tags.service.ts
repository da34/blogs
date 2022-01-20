import { HttpException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: string) {
    return this.tagRepository.findOne(id);
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const exitsTag = await this.tagRepository.findOne(id);
    if (!exitsTag) {
      throw new HttpException(`不存在id为${id}的标签`, 401);
    }
    return this.tagRepository.merge(exitsTag, updateTagDto);
  }

  remove(id: string) {
    return this.tagRepository.delete(id);
  }
}
