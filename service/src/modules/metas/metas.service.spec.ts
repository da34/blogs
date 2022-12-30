import { Test, TestingModule } from '@nestjs/testing';
import { MetasService } from './metas.service';

describe('MetasService', () => {
  let service: MetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetasService],
    }).compile();

    service = module.get<MetasService>(MetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
