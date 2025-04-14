import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MedicModule } from './medics/medic.module';
import { ConsultationModule } from './consultas/consultation.module';
import { ClientModule } from './clients/client.module';
import { Client } from './clients/client.entity';
import { Medic } from './medics/medic.entity';
import { Consultation } from './consultas/consultation.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_NAME', 'db.sqlite'),
        entities: [User, Client, Medic, Consultation],
        synchronize: configService.get<string>('TYPEORM_SYNC', 'true') === 'true',
      }),
    }),
    UsersModule,
    ClientModule,
    MedicModule,
    ConsultationModule,
  ],
})
export class AppModule {}
