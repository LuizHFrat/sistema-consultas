import { IsUUID } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: string;

  @IsUUID()
  uuid_client: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;
}
