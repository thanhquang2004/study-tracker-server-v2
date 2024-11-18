import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { GenerateQuestionRequestDto } from './dto/generateQuestionRequest.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUserId } from './decorators/current-user.decorator';

@Controller()
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @Post('generateQuestion')
  @UseGuards(JwtAuthGuard)
  async generateQuestion(
    @Body() generateQuestionRequestDto: GenerateQuestionRequestDto,
  ) {
    console.log('info', generateQuestionRequestDto.goal);
    return this.roadmapsService.generateQuestion(generateQuestionRequestDto);
  }

  @Post('generateRoadmap')
  @UseGuards(JwtAuthGuard)
  async generateRoadmap(
    @Body() info: { info: string },
    @CurrentUserId() userId: string,
  ) {
    return this.roadmapsService.generateRoadmap(info.info, userId);
  }

  @Get('getRoadmaps')
  @UseGuards(JwtAuthGuard)
  async getRoadmaps(@CurrentUserId() userId: string) {
    return this.roadmapsService.getRoadmapsByUserId(userId);
  }

  @Get('getRoadmap/:roadmapId')
  @UseGuards(JwtAuthGuard)
  async getRoadmap(
    @CurrentUserId() userId: string,
    @Param('roadmapId') roadmapId: string,
  ) {
    return this.roadmapsService.getRoadmapById(roadmapId, userId);
  }

  @Delete('deleteRoadmap/:roadmapId')
  @UseGuards(JwtAuthGuard)
  async deleteRoadmap(
    @CurrentUserId() userId: string,
    @Param('roadmapId') roadmapId: string,
  ) {
    return this.roadmapsService.deleteRoadmapById(roadmapId, userId);
  }

  @Get('test')
  async generateAnswer() {
    console.log('info');
    return this.roadmapsService.test();
  }
}
