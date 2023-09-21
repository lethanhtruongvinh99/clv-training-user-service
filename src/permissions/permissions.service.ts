import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  create(createPermissionDto: CreatePermissionDto) {
    const newPermission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(newPermission);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return this.permissionRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const user = await this.permissionRepository.findOneBy({ id: id });
    if (user) {
      Object.assign(user, updatePermissionDto);
      return this.permissionRepository.save(user);
    } else {
      throw new NotFoundException('Role not found~');
    }
  }
}
