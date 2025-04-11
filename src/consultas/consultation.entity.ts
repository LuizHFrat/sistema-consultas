import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from '../clients/client.entity';
import { Medic } from '../medics/medic.entity';

@Entity()
export class Consultation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  data: Date;

  @ManyToOne(() => Client)
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Medic)
  @JoinColumn()
  medic: Medic;
}
