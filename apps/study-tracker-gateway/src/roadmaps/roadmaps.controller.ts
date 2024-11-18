import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';

@Controller('roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapService: RoadmapsService) {}

  @Get()
  findAll() {
    return this.roadmapService.findAll();
  }

  @Post('generateQuestion')
  async test(@Body() info: string) {
    return this.roadmapService.generateQuestion(info);
  }

  @Post('generateRoadmap')
  test2(@Body() info: string) {
    return this.roadmapService.generateRoadmap(info);
  }
}
