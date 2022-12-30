import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';
import { enPassword } from '../utils';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
@Entity()
export class User {
  constructor(username: string, password: string, secret: string) {
    this.username = username;
    this.password = enPassword(password, secret);
  }
  @PrimaryKey()
  id: number;

  @Property({
    unique: true,
  })
  username: string;

  @Property({ hidden: true })
  password: string;

  @Property({ nullable: true })
  avatar: string;

  @Enum(() => UserRole)
  role: string = UserRole.User;

  @Property()
  gitHubId = '';
}
