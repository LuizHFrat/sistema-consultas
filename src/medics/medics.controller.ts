import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MedicsService } from './medics.service';
import { Medic } from './medic.entity';
import { CreateMedicDto } from './dto/medic.dto';
import { UpdateMedicDto } from './dto/medic.dto';

@Controller('medics')
export class MedicsController {
  constructor(private readonly medicsService: MedicsService) {}

  @Post()
  create(@Body() data: CreateMedicDto): Promise<Medic> {
    return this.medicsService.create(data);
  }

  @Get()
  findAll(): Promise<Medic[]> {
    return this.medicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Medic> {
    return this.medicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateMedicDto): Promise<Medic> {
    return this.medicsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.medicsService.delete(id);
  }
}
