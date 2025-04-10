import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { Medico } from './medico.entity';

@Controller('medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  create(@Body() data: Partial<Medico>): Promise<Medico> {
    return this.medicosService.create(data);
  }

  @Get()
  findAll(): Promise<Medico[]> {
    return this.medicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Medico> {
    return this.medicosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Medico>): Promise<Medico> {
    return this.medicosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.medicosService.delete(id);
  }
}
