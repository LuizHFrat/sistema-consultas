import { IsUUID } from 'class-validator';
import { UserRole } from 'src/shared/helpers/user-role.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @IsUUID()
  uuid_user: string;

  @Column({ unique: true })
  email: string;

  @Column()
  nome: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.INTERN })
  role: UserRole;
}
