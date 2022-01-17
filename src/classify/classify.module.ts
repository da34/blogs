import { Module } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ClassifyController } from './classify.controller';

@Module({
  controllers: [ClassifyController],
  providers: [ClassifyService]
})
export class ClassifyModule {}
