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
import { ConsultasService } from './consultas.service';
import { Consulta } from './consulta.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('consultas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConsultasController {
  constructor(private readonly consultasService: ConsultasService) {}

  @Post()
  @Roles(UserRole.SECRETARIO)
  async create(
    @Body() data: { clienteId: number; medicoId: number; data: Date },
  ): Promise<Consulta> {
    return this.consultasService.create(data);
  }

  @Get()
  @Roles(UserRole.SECRETARIO, UserRole.ESTAGIARIO)
  findAll(): Promise<Consulta[]> {
    return this.consultasService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SECRETARIO, UserRole.ESTAGIARIO)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Consulta> {
    return this.consultasService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SECRETARIO)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { clienteId?: number; medicoId?: number; data?: Date },
  ): Promise<Consulta> {
    return this.consultasService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.SECRETARIO)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.consultasService.delete(id);
  }
}
