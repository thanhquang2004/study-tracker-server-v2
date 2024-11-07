import { NestFactory } from '@nestjs/core';
import { SchedulesModule } from './schedules.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulesModule);
  await app.listen(3000);
}
bootstrap();
