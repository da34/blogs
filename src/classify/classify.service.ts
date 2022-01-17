import { Injectable } from '@nestjs/common';
import { CreateClassifyDto } from './dto/create-classify.dto';
import { UpdateClassifyDto } from './dto/update-classify.dto';

@Injectable()
export class ClassifyService {
  create(createClassifyDto: CreateClassifyDto) {
    return 'This action adds a new classify';
  }

  findAll() {
    return `This action returns all classify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classify`;
  }

  update(id: number, updateClassifyDto: UpdateClassifyDto) {
    return `This action updates a #${id} classify`;
  }

  remove(id: number) {
    return `This action removes a #${id} classify`;
  }
}
