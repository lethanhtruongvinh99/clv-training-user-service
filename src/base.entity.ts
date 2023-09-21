import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ nullable: true })
  created_at?: Date;

  @CreateDateColumn({ nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ nullable: true })
  updated_at?: Date;
}
