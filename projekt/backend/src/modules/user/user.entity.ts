import { Exclude } from 'class-transformer';
import { Role } from 'src/shared/role.enum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar' })
  public email!: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  public role: Role;
}
