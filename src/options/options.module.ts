import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';

@Module({
  controllers: [OptionsController],
  providers: [OptionsService]
})
export class OptionsModule {}
