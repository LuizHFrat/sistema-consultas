import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './consulta.entity';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { Cliente } from '../clientes/cliente.entity';
import { Medico } from '../medicos/medico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta, Cliente, Medico])],
  providers: [ConsultasService],
  controllers: [ConsultasController],
})
export class ConsultasModule {}
