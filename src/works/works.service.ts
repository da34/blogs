import { HttpException, Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,
  ) {}
  create(createWorkDto: CreateWorkDto) {
    const createWork = this.workRepository.create(createWorkDto);
    return this.workRepository.save(createWork);
  }

  findAll(dbOptions) {
    return this.workRepository.find(
      Object.assign(
        {
          order: { priority: 'DESC' },
        },
        dbOptions,
      ),
    );
  }

  findOne(id: string) {
    return this.workRepository.findOne(id);
  }

  async update(id: string, updateWorkDto: UpdateWorkDto) {
    const existWork = await this.workRepository.findOne(id);
    if (!existWork) {
      throw new HttpException(`不存在id为${id}的作品`, 401);
    }
    const updateWork = this.workRepository.merge(existWork, updateWorkDto);
    return this.workRepository.save(updateWork);
  }

  remove(id: string) {
    return this.workRepository.delete(id);
  }
}
