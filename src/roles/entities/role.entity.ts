import { BaseEntity } from 'src/base.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @Column()
  name?: string;

  @Column()
  description?: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: Permission[];
}
