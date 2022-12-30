import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Content } from './content.entity';

enum MetaType {
  Category = 'category',
  Tag = 'tag',
}
@Entity()
export class Meta {
  @PrimaryKey()
  mid: number;

  @Property()
  name: string;

  @Enum(() => MetaType)
  type: string;

  @Property()
  description: string;

  @Property()
  count: number;

  @Property()
  order: number;

  @ManyToMany({ entity: () => Content, mappedBy: (c) => c.metas })
  contents = new Collection<Content>(this);
}
