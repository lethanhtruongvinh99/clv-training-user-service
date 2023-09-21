import { BaseEntity } from 'src/base.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @Column()
  // maybe the endpoint should be /permissions
  // if user have role that have permission to this endpoint and the method --> pass
  name?: string;

  @Column()
  description?: string;

  @Column()
  // Just CREATE, READ, UPDATE, DELETE
  code?: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
