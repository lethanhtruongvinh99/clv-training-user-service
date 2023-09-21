import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ role: 'role', cmd: 'create' })
  create(@Payload() payload: { role: CreateRoleDto }) {
    return this.rolesService.create(payload.role);
  }

  @MessagePattern({ role: 'role', cmd: 'get-all' })
  findAll() {
    return this.rolesService.findAll();
  }

  @MessagePattern({ role: 'role', cmd: 'get-one' })
  findOne(@Payload() payload: { id: number }) {
    return this.rolesService.findOne(payload.id);
  }

  @MessagePattern({ role: 'role', cmd: 'update' })
  update(@Payload() payload: { id: number; role: UpdateRoleDto }) {
    return this.rolesService.update(payload.id, payload.role);
  }
}
