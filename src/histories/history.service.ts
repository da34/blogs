import { HttpException, Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  create(createHistoryDto: CreateHistoryDto) {
    const createHistory = this.historyRepository.create(createHistoryDto);
    return this.historyRepository.save(createHistory);
  }

  findAll() {
    return this.historyRepository.find();
  }

  findOne(id: string) {
    return this.historyRepository.findOne(id);
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    const existHistory = await this.historyRepository.findOne(id);
    if (!existHistory) {
      throw new HttpException(`不存在id为${id}的建站日志`, 401);
    }
    return this.historyRepository.merge(existHistory, updateHistoryDto);
  }

  remove(id: string) {
    return this.historyRepository.delete(id);
  }
}
