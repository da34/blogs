import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
    comment: '用户显示的名称',
  })
  screenName: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: string;

  @Column({
    type: 'bigint',
  })
  createdTime: number;

  @Column({
    type: 'bigint',
  })
  loggedTime: number;

  @Column()
  mail: string;

  @Column()
  avatar: string;

  @BeforeInsert()
  createDates() {
    // 插入之前更改默认。防止直接请求
    this.role = UserRole.User;
    this.createdTime = Date.now();
  }
}
