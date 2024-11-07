import { Test, TestingModule } from '@nestjs/testing';
import { RoadmapsController } from './roadmaps.controller';
import { RoadmapsService } from './roadmaps.service';

describe('RoadmapsController', () => {
  let roadmapsController: RoadmapsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RoadmapsController],
      providers: [RoadmapsService],
    }).compile();

    roadmapsController = app.get<RoadmapsController>(RoadmapsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(roadmapsController.getHello()).toBe('Hello World!');
    });
  });
});
