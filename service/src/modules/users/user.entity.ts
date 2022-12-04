import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';

export enum UserRole {
  User = 'user',
  Admin = 'admin',
}
@Entity()
export class User {
  @PrimaryKey()
  id: string;

  @Property({
    unique: true,
  })
  username: string;

  @Property({ hidden: true })
  password: string;

  @Property()
  avatar: string;

  @Enum(() => UserRole)
  role: string = UserRole.User;

  @Property()
  gitHubId: string;
}
