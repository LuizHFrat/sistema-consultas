import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medico } from './medico.entity';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private medicosRepository: Repository<Medico>,
  ) {}

  async findAll(): Promise<Medico[]> {
    return this.medicosRepository.find();
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicosRepository.findOneBy({ id });
    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }
    return medico;
  }

  async create(data: Partial<Medico>): Promise<Medico> {
    const medico = this.medicosRepository.create(data);
    return this.medicosRepository.save(medico);
  }

  async update(id: number, data: Partial<Medico>): Promise<Medico> {
    const medico = await this.medicosRepository.findOneBy({ id });
    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }

    Object.assign(medico, data);
    return this.medicosRepository.save(medico);
  }

  async delete(id: number): Promise<void> {
    const medico = await this.medicosRepository.findOneBy({ id });
    if (!medico) {
      throw new NotFoundException('Médico não encontrado');
    }

    await this.medicosRepository.remove(medico);
  }
}
