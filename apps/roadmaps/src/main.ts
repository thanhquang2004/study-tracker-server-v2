import { NestFactory } from '@nestjs/core';
import { RoadmapsModule } from './roadmaps.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RoadmapsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'roadmaps-consumer',
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
