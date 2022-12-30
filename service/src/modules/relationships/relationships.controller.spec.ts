import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipsController } from './relationships.controller';
import { RelationshipsService } from './relationships.service';

describe('RelationshipsController', () => {
  let controller: RelationshipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelationshipsController],
      providers: [RelationshipsService],
    }).compile();

    controller = module.get<RelationshipsController>(RelationshipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
