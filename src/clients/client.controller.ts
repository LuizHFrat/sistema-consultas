import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { Client } from './client.entity';
import { ClientService } from './client.service';


@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() data: Partial<Client>): Promise<Client> {
    return this.clientService.create(data);
  }

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Client>): Promise<Client> {
    return this.clientService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.clientService.delete(id);
  }
}
