import { HttpException, Injectable } from '@nestjs/common';
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
  create(createCategoryDto: CreateCategoryDto) {
    const createCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(createCategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: string) {
    return this.categoryRepository.findOne(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const exitsCategory = await this.categoryRepository.findOne(id);
    if (!exitsCategory) {
      throw new HttpException(`不存在id为${id}的分类`, 401);
    }
    const updateCategory = this.categoryRepository.merge(
      exitsCategory,
      updateCategoryDto,
    );

    return this.categoryRepository.save(updateCategory);
  }

  remove(id: string) {
    return this.categoryRepository.delete(id);
  }
}
