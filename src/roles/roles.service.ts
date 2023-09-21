import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  create(createRoleDto: CreateRoleDto) {
    const newRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(newRole);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({ id: id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const user = await this.roleRepository.findOneBy({ id: id });
    if (user) {
      Object.assign(user, updateRoleDto);
      return this.roleRepository.save(user);
    } else {
      throw new NotFoundException('Role not found~');
    }
  }
}
