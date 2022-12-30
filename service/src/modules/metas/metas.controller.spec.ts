import { Test, TestingModule } from '@nestjs/testing';
import { MetasController } from './metas.controller';
import { MetasService } from './metas.service';

describe('MetasController', () => {
  let controller: MetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetasController],
      providers: [MetasService],
    }).compile();

    controller = module.get<MetasController>(MetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
