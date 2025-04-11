import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { MedicsModule } from './medics/medic.module';
import { ConsultationModule } from './consultas/consultation.module';
import { Client } from './clients/client.entity';
import { Medic } from './medics/medic.entity';
import { Consultation } from './consultas/consultation.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Client, Medic, Consultation],
      synchronize: true, // Em produção deixe como falso!
    }),
    UsersModule,
    ClientsModule,
    MedicsModule,
    ConsultationModule,
  ],
})
export class AppModule {}
