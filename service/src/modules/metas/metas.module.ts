import { Module } from '@nestjs/common';
import { MetasService } from './metas.service';
import { MetasController } from './metas.controller';

@Module({
  controllers: [MetasController],
  providers: [MetasService]
})
export class MetasModule {}
