import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Content } from '../../entities';
// import { Category } from '../categories/category.entity';
// import { Tag } from '../tags/tag.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Content])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
