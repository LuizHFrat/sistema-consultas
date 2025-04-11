import { Test, TestingModule } from '@nestjs/testing';
import { MedicsController } from './medics.controller';

describe('MedicsController', () => {
  let controller: MedicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicsController],
    }).compile();

    controller = module.get<MedicsController>(MedicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
