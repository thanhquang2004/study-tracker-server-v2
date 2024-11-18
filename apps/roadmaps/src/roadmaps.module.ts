import { Module } from '@nestjs/common';
import { RoadmapsController } from './roadmaps.controller';
import { RoadmapsService } from './roadmaps.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    GoogleGenerativeAI,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [RoadmapsController],
  providers: [
    RoadmapsService,
    GoogleGenerativeAI,
    ConfigService,
    PrismaService,
    JwtStrategy,
  ],
})
export class RoadmapsModule {}
