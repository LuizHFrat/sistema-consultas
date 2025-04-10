import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Medico } from '../medicos/medico.entity';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: Date;

  @ManyToOne(() => Cliente)
  @JoinColumn()
  cliente: Cliente;

  @ManyToOne(() => Medico)
  @JoinColumn()
  medico: Medico;
}
