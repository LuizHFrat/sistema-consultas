import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medic } from './medic.entity';
import { MedicService } from './medic.service';
import { MedicController } from './medic.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Medic])],
  providers: [MedicService],
  controllers: [MedicController],
})
export class MedicsModule {}
