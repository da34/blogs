import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { Exclude } from 'class-transformer';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: string;

  @BeforeInsert()
  createDates() {
    // 插入之前更改默认。防止直接请求
    this.role = UserRole.User;
  }
}
