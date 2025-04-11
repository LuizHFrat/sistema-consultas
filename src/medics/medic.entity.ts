import { IsUUID } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Medic {
  @PrimaryGeneratedColumn()
  id: string;

  @IsUUID()
  uuid_medic: string;

  @Column()
  name: string;

  @Column()
  specialty: string;
}
