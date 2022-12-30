import { Injectable } from '@nestjs/common';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';

@Injectable()
export class MetasService {
  create(createMetaDto: CreateMetaDto) {
    return 'This action adds a new meta';
  }

  findAll() {
    return `This action returns all metas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meta`;
  }

  update(id: number, updateMetaDto: UpdateMetaDto) {
    return `This action updates a #${id} meta`;
  }

  remove(id: number) {
    return `This action removes a #${id} meta`;
  }
}
