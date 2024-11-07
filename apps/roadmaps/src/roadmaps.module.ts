import { Module } from '@nestjs/common';
import { RoadmapsController } from './roadmaps.controller';
import { RoadmapsService } from './roadmaps.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [GoogleGenerativeAI],
  controllers: [RoadmapsController],
  providers: [RoadmapsService, GoogleGenerativeAI, ConfigService],
})
export class RoadmapsModule {}
