import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { Consulta } from './consulta.entity';

@Controller('consultas')
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  async create(
    @Body() data: { clienteId: string; medicoId: string; data: Date },
  ): Promise<Consulta> {
    return this.consultasService.create(data);
  }

  @Get()
  findAll(): Promise<Consulta[]> {
    return this.consultasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Consulta> {
    return this.consultasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: { clienteId?: string; medicoId?: string; data?: Date },
  ): Promise<Consulta> {
    return this.consultasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.consultasService.delete(id);
  }
}
