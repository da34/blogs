import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class BaseEntity {
  @PrimaryKey()
  id: number;

  @Property({
    type: 'bigint',
    default: 0,
    onCreate: () => Date.now(),
  })
  createdTime: number = Date.now();

  @Property({
    type: 'bigint',
    default: 0,
    onUpdate: () => Date.now(),
  })
  updatedTime: number = Date.now();
}
