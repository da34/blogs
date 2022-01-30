import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [WorksController],
  providers: [WorksService],
})
export class WorksModule {}
