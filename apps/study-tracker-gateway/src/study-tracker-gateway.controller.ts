import { Controller } from '@nestjs/common';
import { StudyTrackerGatewayService } from './study-tracker-gateway.service';

@Controller()
export class StudyTrackerGatewayController {
  constructor(
    private readonly studyTrackerGatewayService: StudyTrackerGatewayService,
  ) {}
}
