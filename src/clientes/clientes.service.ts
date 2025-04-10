import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  create(data: Partial<Cliente>): Promise<Cliente> {
    const cliente = this.clienteRepository.create(data);
    return this.clienteRepository.save(cliente);
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) throw new Error('Cliente não encontrado');
    return cliente;
  }

  async update(id: string, data: Partial<Cliente>): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, data);
    return this.clienteRepository.save(cliente);
  }

  async delete(id: string): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}
