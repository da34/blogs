import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createClassifyDto: CreateCategoryDto) {
    return 'This action adds a new categories';
  }

  findAll() {
    console.log(this.categoryRepository.find());
    // return this.linkRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} classify`;
  }

  update(id: number, updateClassifyDto: UpdateCategoryDto) {
    return `This action updates a #${id} classify`;
  }

  remove(id: number) {
    return `This action removes a #${id} classify`;
  }
}
