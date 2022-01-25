import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AdminTagsController, TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagsController, AdminTagsController],
  providers: [TagsService],
})
export class TagsModule {}
