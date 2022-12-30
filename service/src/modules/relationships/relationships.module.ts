import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';

@Module({
  controllers: [RelationshipsController],
  providers: [RelationshipsService]
})
export class RelationshipsModule {}
