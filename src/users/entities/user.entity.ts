import { BaseEntity } from 'src/base.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  // @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt?: string;

  @Column()
  hashed_password?: string;

  // to create a more robust authen --> create a salt string (create random string) and hashed password column.
  // when user login --> find user with email (email should be unique) --> get salt string -->
  // encrypt the provided password with the specific salt --> compare to the saved hased password

  @Column()
  first_name?: string;

  @Column()
  last_name?: string;

  @Column({ default: false })
  is_pending: boolean;

  @Column({ default: false })
  is_disabled: boolean;

  @Column({ nullable: true })
  country_code?: string;

  @Column({ nullable: true })
  office_code?: string;

  @Column({ nullable: true })
  updated_user?: number;

  @ManyToOne(() => User, (user) => user.id)
  parent: User;

  @OneToMany(() => User, (user) => user.updated_user)
  updated_users: User[];

  @ManyToMany(() => Role, (role) => role.users)
  // to add more fields in join table --> create a join table manually
  // join table will have ManyToOne relation
  // normal table will have OneToMany relations
  @JoinTable({
    name: 'user_role',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
