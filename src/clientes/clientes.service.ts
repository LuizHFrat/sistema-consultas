import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }

  async create(data: Partial<Cliente>): Promise<Cliente> {
    const cliente = this.clientesRepository.create(data);
    return this.clientesRepository.save(cliente);
  }

  async update(id: number, data: Partial<Cliente>): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    Object.assign(cliente, data);
    return this.clientesRepository.save(cliente);
  }

  async delete(id: number): Promise<void> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    await this.clientesRepository.remove(cliente);
  }
}
