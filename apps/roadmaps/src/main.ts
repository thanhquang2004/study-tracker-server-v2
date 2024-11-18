import { NestFactory } from '@nestjs/core';
import { RoadmapsModule } from './roadmaps.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(RoadmapsModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  await app.listen(3000);

  const kafkaMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(RoadmapsModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9094'],
        },
        consumer: {
          groupId: 'roadmaps-consumer',
        },
      },
    });

  await kafkaMicroservice.listen();
}
bootstrap();
