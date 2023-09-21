import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_role')
export class UserRole {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column()
  @PrimaryColumn()
  user_id: number;

  @Column()
  @PrimaryColumn()
  role_id: number;
}
