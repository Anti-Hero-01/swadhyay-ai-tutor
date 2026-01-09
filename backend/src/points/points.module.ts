import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { PointsGateway } from './points.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule, // REQUIRED for JwtAuthGuard + Passport
  ],
  controllers: [PointsController],
  providers: [PointsService, PointsGateway],
  exports: [PointsService, PointsGateway],
})
export class PointsModule {}
