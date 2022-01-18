import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';

@Module({
  controllers: [WorksController],
  providers: [WorksService],
})
export class WorksModule {}
