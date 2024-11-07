import { NestFactory } from '@nestjs/core';
import { StudyTrackerGatewayModule } from './study-tracker-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(StudyTrackerGatewayModule);
  await app.listen(3000);
}
bootstrap();
