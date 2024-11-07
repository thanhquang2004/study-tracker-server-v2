import { Module } from '@nestjs/common';
import { StudyTrackerGatewayController } from './study-tracker-gateway.controller';
import { StudyTrackerGatewayService } from './study-tracker-gateway.service';
import { RoadmapsModule } from './roadmaps/roadmaps.module';

@Module({
  imports: [RoadmapsModule],
  controllers: [StudyTrackerGatewayController],
  providers: [StudyTrackerGatewayService],
})
export class StudyTrackerGatewayModule {}
