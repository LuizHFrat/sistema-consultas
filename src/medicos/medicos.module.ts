import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medico } from './medico.entity';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Medico])],
  providers: [MedicosService],
  controllers: [MedicosController],
})
export class MedicosModule {}
