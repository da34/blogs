import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  providers: [OptionsService],
  controllers: [OptionsController],
})
export class OptionsModule {}
