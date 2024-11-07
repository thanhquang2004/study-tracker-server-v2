import { Body, Controller, Get } from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';

@Controller('roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapService: RoadmapsService) {}

  @Get()
  findAll() {
    return this.roadmapService.findAll();
  }

  @Get('test')
  test(@Body() info: string) {
    return this.roadmapService.generateQuestion(info);
  }
}
