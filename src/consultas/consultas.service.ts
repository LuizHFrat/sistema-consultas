import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from './consulta.entity';
import { Cliente } from '../clientes/cliente.entity';
import { Medico } from '../medicos/medico.entity';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
  ) {}

  async create(data: {
    clienteId: string;
    medicoId: string;
    data: Date;
  }): Promise<Consulta> {
    const cliente = await this.clienteRepository.findOne({
      where: { id: data.clienteId },
    });
    const medico = await this.medicoRepository.findOne({
      where: { id: data.medicoId },
    });

    if (!cliente || !medico) {
      throw new Error('Cliente ou médico não encontrado');
    }

    const consulta = this.consultaRepository.create({
      data: data.data,
      cliente,
      medico,
    });

    return this.consultaRepository.save(consulta);
  }

  findAll(): Promise<Consulta[]> {
    return this.consultaRepository.find({ relations: ['cliente', 'medico'] });
  }

  async findOne(id: string): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['cliente', 'medico'],
    });

    if (!consulta) {
      throw new Error('Consulta não encontrada');
    }

    return consulta;
  }

  async update(
    id: string,
    data: { clienteId?: string; medicoId?: string; data?: Date },
  ): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['cliente', 'medico'],
    });

    if (!consulta) {
      throw new Error('Consulta não encontrada');
    }

    if (data.clienteId) {
      const cliente = await this.clienteRepository.findOne({
        where: { id: data.clienteId },
      });
      if (!cliente) throw new Error('Cliente não encontrado');
      consulta.cliente = cliente;
    }

    if (data.medicoId) {
      const medico = await this.medicoRepository.findOne({
        where: { id: data.medicoId },
      });
      if (!medico) throw new Error('Médico não encontrado');
      consulta.medico = medico;
    }

    if (data.data) {
      consulta.data = data.data;
    }

    return this.consultaRepository.save(consulta);
  }

  async delete(id: string): Promise<void> {
    const consulta = await this.consultaRepository.findOne({ where: { id } });

    if (!consulta) {
      throw new Error('Consulta não encontrada');
    }

    await this.consultaRepository.remove(consulta);
  }
}
