import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medic } from './medic.entity';
import { Repository } from 'typeorm';
import { CreateMedicDto, UpdateMedicDto } from './dto/medic.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MedicsService {
  constructor(
    @InjectRepository(Medic)
    private readonly medicRepository: Repository<Medic>,
  ) {}

  async create(payload: CreateMedicDto): Promise<Medic> {
    const medic = this.medicRepository.create({
      ...payload,
      uuid_medic: uuidv4(),
    });
    return this.medicRepository.save(medic);
  }

  findAll(): Promise<Medic[]> {
    return this.medicRepository.find();
  }

  async findOne(uuid: string): Promise<Medic> {
    const medic = await this.medicRepository.findOne({
      where: { uuid_medic: uuid },
    });
    if (!medic) throw new Error('Médico não encontrado');
    return medic;
  }

  async findOneByName(name: string): Promise<Medic> {
    const medic = await this.medicRepository.findOne({
      where: { name },
    });
    if (!medic) throw new Error('Médico não encontrado');
    return medic;
  }

  async update(uuid: string, data: Partial<UpdateMedicDto>): Promise<Medic> {
    const medic = await this.findOne(uuid);
    Object.assign(medic, data);
    return this.medicRepository.save(medic);
  }

  async delete(uuid: string): Promise<void> {
    const medic = await this.findOne(uuid);
    await this.medicRepository.remove(medic);
  }
}
