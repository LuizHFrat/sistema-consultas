import { Injectable, NotFoundException } from '@nestjs/common';
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
    clienteId: number;
    medicoId: number;
    data: Date;
  }): Promise<Consulta> {
    const cliente = await this.clienteRepository.findOneBy({ id: data.clienteId });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    const medico = await this.medicoRepository.findOneBy({ id: data.medicoId });
    if (!medico) throw new NotFoundException('Médico não encontrado');

    const consulta = this.consultaRepository.create({
      cliente,
      medico,
      data: data.data,
    });

    return this.consultaRepository.save(consulta);
  }

  async findAll(): Promise<Consulta[]> {
    return this.consultaRepository.find({
      relations: ['cliente', 'medico'],
    });
  }

  async findOne(id: number): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['cliente', 'medico'],
    });

    if (!consulta) {
      throw new NotFoundException('Consulta não encontrada');
    }

    return consulta;
  }

  async update(
    id: number,
    data: { clienteId?: number; medicoId?: number; data?: Date },
  ): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({
      where: { id },
      relations: ['cliente', 'medico'],
    });

    if (!consulta) {
      throw new NotFoundException('Consulta não encontrada');
    }

    if (data.clienteId) {
      const cliente = await this.clienteRepository.findOneBy({ id: data.clienteId });
      if (!cliente) throw new NotFoundException('Cliente não encontrado');
      consulta.cliente = cliente;
    }

    if (data.medicoId) {
      const medico = await this.medicoRepository.findOneBy({ id: data.medicoId });
      if (!medico) throw new NotFoundException('Médico não encontrado');
      consulta.medico = medico;
    }

    if (data.data) {
      consulta.data = data.data;
    }

    return this.consultaRepository.save(consulta);
  }

  async delete(id: number): Promise<void> {
    const consulta = await this.consultaRepository.findOneBy({ id });
    if (!consulta) {
      throw new NotFoundException('Consulta não encontrada');
    }

    await this.consultaRepository.remove(consulta);
  }
}
