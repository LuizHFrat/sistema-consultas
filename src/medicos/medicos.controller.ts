import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { Medico } from './medico.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('medicos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) {}

  @Post()
  @Roles(UserRole.SECRETARIO)
  create(@Body() data: Partial<Medico>): Promise<Medico> {
    return this.medicosService.create(data);
  }

  @Get()
  @Roles(UserRole.SECRETARIO, UserRole.ESTAGIARIO)
  findAll(): Promise<Medico[]> {
    return this.medicosService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SECRETARIO, UserRole.ESTAGIARIO)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Medico> {
    return this.medicosService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SECRETARIO)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Medico>): Promise<Medico> {
    return this.medicosService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.SECRETARIO)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.medicosService.delete(id);
  }
}
