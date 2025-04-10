import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SECRETARIO = 'secretario',
  ESTAGIARIO = 'estagiario',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  nome: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.ESTAGIARIO })
  role: UserRole;
}
