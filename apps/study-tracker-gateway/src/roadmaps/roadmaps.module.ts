import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoadmapsService } from './roadmaps.service';
import { RoadmapsController } from './roadmaps.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ROADMAP_SERVICE',
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
    ]),
  ],
  providers: [RoadmapsService],
  controllers: [RoadmapsController],
})
export class RoadmapsModule {}
