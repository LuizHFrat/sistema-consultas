import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { Consultation } from './consultation.entity';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  async create(
    @Body() data: { clientId: string; medicId: string; data: Date },
  ): Promise<Consultation> {
    return this.consultationService.create(data);
  }

  @Get()
  findAll(): Promise<Consultation[]> {
    return this.consultationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Consultation> {
    return this.consultationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: { clientId?: string; medicId?: string; data?: Date },
  ): Promise<Consultation> {
    return this.consultationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.consultationService.delete(id);
  }
}
