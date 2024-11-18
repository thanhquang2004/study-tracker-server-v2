import { IsString } from 'class-validator';

export class GenerateQuestionRequestDto {
  @IsString()
  info: string;
  @IsString()
  goal: string;
}
