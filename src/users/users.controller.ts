import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserRole } from 'src/shared/helpers/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Partial<User>): Promise<User> {
    return this.usersService.create(data);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id/role')
  updateRole(
    @Param('id') id: string,
    @Body() data: { role: UserRole },
  ): Promise<User> {
    return this.usersService.setRole(id, data.role);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}