import { NestFactory } from '@nestjs/core';
import { StudyTrackerGatewayModule } from './study-tracker-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(StudyTrackerGatewayModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  await app.listen(3000);
}
bootstrap();
