import { Test, TestingModule } from '@nestjs/testing';
import { StudyTrackerGatewayController } from './study-tracker-gateway.controller';
import { StudyTrackerGatewayService } from './study-tracker-gateway.service';

describe('StudyTrackerGatewayController', () => {
  let studyTrackerGatewayController: StudyTrackerGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudyTrackerGatewayController],
      providers: [StudyTrackerGatewayService],
    }).compile();

    studyTrackerGatewayController = app.get<StudyTrackerGatewayController>(StudyTrackerGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(studyTrackerGatewayController.getHello()).toBe('Hello World!');
    });
  });
});
