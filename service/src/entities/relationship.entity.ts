import { Entity, ManyToOne } from '@mikro-orm/core';
import { Content } from './content.entity';
import { Meta } from './meta.entity';

@Entity()
export class Relationship {
  @ManyToOne({ primary: true })
  cid: Content;

  @ManyToOne({ primary: true })
  mid: Meta;
}
