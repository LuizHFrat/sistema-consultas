import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MedicService } from './medic.service';
import { Medic } from './medic.entity';
import { CreateMedicDto } from './dto/medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';

@Controller('medics')
export class MedicController {
  constructor(private readonly medicService: MedicService) {}

  @Post()
  create(@Body() data: CreateMedicDto): Promise<Medic> {
    return this.medicService.create(data);
  }

  @Get()
  findAll(): Promise<Medic[]> {
    return this.medicService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<Medic> {
  //   return this.medicsService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateMedicDto): Promise<Medic> {
    return this.medicService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.medicService.delete(id);
  }
}
