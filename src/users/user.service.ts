import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async register(dto: RegisterUserDto): Promise<User> {
    const user = await this.userRepo.create(dto);
    return this.userRepo.save(user);
  }

  // ✅ Updated method to fix concurrent query issue
  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    await this.userRepo.update(id, data);
    return this.userRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
