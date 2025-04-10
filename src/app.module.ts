import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientesModule } from './clientes/clientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { Cliente } from './clientes/cliente.entity';
import { Medico } from './medicos/medico.entity';
import { Consulta } from './consultas/consulta.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Cliente, Medico, Consulta],
      synchronize: true, // Em produção deixe como falso!
    }),
    UsersModule,
    ClientesModule,
    MedicosModule,
    ConsultasModule,
  ],
})
export class AppModule {}
