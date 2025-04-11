import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consultation } from './consultation.entity';
import { Client } from '../clients/client.entity';
import { Medic } from '../medics/medic.entity';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Medic)
    private readonly medicRepository: Repository<Medic>,
  ) {}

  async create(data: {
    clientId: string;
    medicId: string;
    data: Date;
  }): Promise<Consultation> {
    const client = await this.clientRepository.findOne({
      where: { id: data.clientId },
    });
    const medic = await this.medicRepository.findOne({
      where: { id: data.medicId },
    });

    if (!client || !medic) {
      throw new Error('Cliente ou médico não encontrado');
    }

    const consultation = this.consultationRepository.create({
      data: data.data,
      client,
      medic,
    });

    return this.consultationRepository.save(consultation);
  }

  findAll(): Promise<Consultation[]> {
    return this.consultationRepository.find({ relations: ['client', 'medic'] });
  }

  async findOne(id: string): Promise<Consultation> {
    const consultation = await this.consultationRepository.findOne({
      where: { id },
      relations: ['client', 'medic'],
    });

    if (!consultation) {
      throw new Error('Consulta não encontrada');
    }

    return consultation;
  }

  async update(
    id: string,
    data: { clientId?: string; medicId?: string; data?: Date },
  ): Promise<Consultation> {
    const consultation = await this.consultationRepository.findOne({
      where: { id },
      relations: ['client', 'medic'],
    });

    if (!consultation) {
      throw new Error('Consulta não encontrada');
    }

    if (data.clientId) {
      const client = await this.clientRepository.findOne({
        where: { id: data.clientId },
      });
      if (!client) throw new Error('Cliente não encontrado');
      consultation.client = client;
    }

    if (data.medicId) {
      const medic = await this.medicRepository.findOne({
        where: { id: data.medicId },
      });
      if (!medic) throw new Error('Médico não encontrado');
      consultation.medic = medic;
    }

    if (data.data) {
      consultation.data = data.data;
    }

    return this.consultationRepository.save(consultation);
  }

  async delete(id: string): Promise<void> {
    const consultation = await this.consultationRepository.findOne({ where: { id } });

    if (!consultation) {
      throw new Error('Consulta não encontrada');
    }

    await this.consultationRepository.remove(consultation);
  }
}
