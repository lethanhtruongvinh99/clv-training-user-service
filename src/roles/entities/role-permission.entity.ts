import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('role_permission')
export class RolePermission {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column()
  @PrimaryColumn()
  permission_id: number;

  @Column()
  @PrimaryColumn()
  role_id: number;
}
