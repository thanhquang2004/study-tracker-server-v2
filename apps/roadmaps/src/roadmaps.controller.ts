import { Body, Controller, Get } from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @MessagePattern('generateQuestion')
  async generateQuestion(@Body() info: { info: string }) {
    console.log('info', info);
    return this.roadmapsService.generateQuestion(info.info);
  }

  @Get('test')
  async generateAnswer() {
    console.log('info');
    return this.roadmapsService.test();
  }
}
