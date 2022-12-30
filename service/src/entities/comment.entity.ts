import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryKey()
  coid: number;

  // @PrimaryKey()
  // cid: number;

  @Property()
  author: string;

  @Property()
  mail: string;

  @Property()
  url: string;

  @Property()
  ip: string;

  @Property()
  agent: string;

  @Property()
  text: string;

  @Property()
  type: string;

  @Property()
  status: string;

  @Property()
  parent: number;
}
