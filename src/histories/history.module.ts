import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
