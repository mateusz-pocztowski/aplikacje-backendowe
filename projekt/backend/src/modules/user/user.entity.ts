import { Exclude } from 'class-transformer';
import { Role } from 'src/shared/role.enum';
import {
  BaseEntity,
  Column,
  DeepPartial,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor(partial: DeepPartial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public name: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar' })
  public email!: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  public role: Role;
}
