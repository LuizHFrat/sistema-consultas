import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medico } from './medico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  create(data: Partial<Medico>): Promise<Medico> {
    const medico = this.medicoRepository.create(data);
    return this.medicoRepository.save(medico);
  }

  findAll(): Promise<Medico[]> {
    return this.medicoRepository.find();
  }

  async findOne(id: string): Promise<Medico> {
    const medico = await this.medicoRepository.findOne({ where: { id } });
    if (!medico) throw new Error('Médico não encontrado');
    return medico;
  }

  async update(id: string, data: Partial<Medico>): Promise<Medico> {
    const medico = await this.findOne(id);
    Object.assign(medico, data);
    return this.medicoRepository.save(medico);
  }

  async delete(id: string): Promise<void> {
    const medico = await this.findOne(id);
    await this.medicoRepository.remove(medico);
  }
}
