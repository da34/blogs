import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { AdminContentsController, ContentsController } from "./contents.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Category } from '../categories/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, Category, Tag])],
  controllers: [ContentsController, AdminContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
