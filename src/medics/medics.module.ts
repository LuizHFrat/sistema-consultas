import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medic } from './medic.entity';
import { MedicsService } from './medics.service';
import { MedicsController } from './medics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Medic])],
  providers: [MedicsService],
  controllers: [MedicsController],
})
export class MedicsModule {}
