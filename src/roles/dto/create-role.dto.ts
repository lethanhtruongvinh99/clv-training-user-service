import { Permission } from 'src/permissions/entities/permission.entity';

export class CreateRoleDto {
  name?: string;
  description?: string;
  permissions?: Permission[];
}
