import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User} from './user.entity';
import { UserRole } from 'src/shared/helpers/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, data);
    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
  
  async setRole(id: string, role: UserRole): Promise<User> {
    const user = await this.findOne(id);
    user.role = role;
    return this.usersRepository.save(user);
  }

  async removeRole(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.role = UserRole.INTERN;
    return this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}