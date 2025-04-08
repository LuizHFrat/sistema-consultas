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
import { ClientesService } from './clientes.service';
import { Cliente } from './cliente.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @Roles(UserRole.SECRETARIO)
  create(@Body() data: Partial<Cliente>): Promise<Cliente> {
    return this.clientesService.create(data);
  }

  @Get()
  @Roles(UserRole.SECRETARIO, UserRole.ESTAGIARIO)
  findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SECRETARIO, UserRole.ESTAGIARIO)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.SECRETARIO)
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Cliente>): Promise<Cliente> {
    return this.clientesService.update(id, data);
  }

  @Delete(':id')
  @Roles(UserRole.SECRETARIO)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clientesService.delete(id);
  }
}
