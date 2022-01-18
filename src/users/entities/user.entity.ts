import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from "class-transformer";

enum UserRole {
  NORMAL = 'normal',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    select: false
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  role: string;
}
