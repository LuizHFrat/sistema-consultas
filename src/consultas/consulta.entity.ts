import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Medico } from '../medicos/medico.entity';

@Entity()
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @ManyToOne(() => Medico)
  medico: Medico;
}
