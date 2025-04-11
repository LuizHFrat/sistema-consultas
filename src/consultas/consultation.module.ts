import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './consultation.entity';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { Client } from '../clients/client.entity';
import { Medic } from '../medics/medic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation, Client, Medic])],
  providers: [ConsultationService],
  controllers: [ConsultationController],
})
export class ConsultationModule {}
