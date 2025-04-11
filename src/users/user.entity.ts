import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsUUID } from 'class-validator';
import { UserRole } from 'src/shared/helpers/user-role.enum';

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

  @Column({ type: 'int', default: UserRole.INTERN })
  role: UserRole;
}
