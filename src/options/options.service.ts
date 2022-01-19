import { HttpException, Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  create(createOptionDto: CreateOptionDto) {
    const option = this.optionRepository.create(createOptionDto);
    return this.optionRepository.save(option);
  }

  findOne(key: string) {
    return this.optionRepository.find({ where: { key } });
  }

  async update(id: string, updateOptionDto: UpdateOptionDto) {
    const existOption = await this.optionRepository.findOne(id);
    if (!existOption) {
      throw new HttpException(`id为${id}配置不存在`, 401);
    }
    const updateOption = this.optionRepository.merge(
      existOption,
      updateOptionDto,
    );
    return this.optionRepository.save(updateOption);
  }
}
