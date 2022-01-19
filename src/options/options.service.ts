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
    const option = await this.optionRepository.findOne(id);
    if (!option) {
      throw new HttpException('配置不存在', 401);
    }
    // return this.optionRepository.save(option);
  }
}
