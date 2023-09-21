import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @MessagePattern({ role: 'permission', cmd: 'create' })
  create(@Payload() payload: { permission: CreatePermissionDto }) {
    return this.permissionsService.create(payload.permission);
  }

  @MessagePattern({ role: 'permission', cmd: 'get-all' })
  findAll() {
    return this.permissionsService.findAll();
  }

  @MessagePattern({ role: 'permission', cmd: 'get-one' })
  findOne(@Payload() payload: { id: number }) {
    return this.permissionsService.findOne(payload.id);
  }

  @MessagePattern({ role: 'permission', cmd: 'update' })
  update(@Payload() payload: { id: number; permission: UpdatePermissionDto }) {
    return this.permissionsService.update(payload.id, payload.permission);
  }
}
