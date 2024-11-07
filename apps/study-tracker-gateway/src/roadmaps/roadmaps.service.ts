import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class RoadmapsService {
  constructor(
    @Inject('ROADMAP_SERVICE') private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('generateQuestion');
  }

  findAll() {
    return this.client.send({ cmd: 'hello' }, {});
  }

  generateQuestion(info: string) {
    // return this.client.send('generateQuestion', info);
    return this.client.send('generateQuestion', info);
  }
}
