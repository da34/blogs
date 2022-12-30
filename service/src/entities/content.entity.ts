import {
  Entity,
  Property,
  PrimaryKey,
  Enum,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { Meta } from './meta.entity';
import { Relationship } from './relationship.entity';
import { BaseEntity } from './baseEntity';

export enum TypeContent {
  Post = 'post',
  Draft = 'draft',
  Page = 'page',
  Link = 'link',
  Attachment = 'attachment',
}
@Entity()
export class Content extends BaseEntity {
  @Property()
  title: string;

  @Exclude()
  @Property({
    type: 'text',
  })
  text: string;

  @Property({
    comment: '内容概览',
    nullable: true,
  })
  briefContent: string;

  @Property({
    comment: '头图',
    nullable: true,
  })
  coverImage: string;

  @Enum(() => TypeContent)
  type: string;

  @Property({
    default: true,
  })
  status: boolean;

  @Property({
    default: 0,
  })
  viewCount: number;

  @Property({
    comment: '评论开启 true - 开启 , false - 禁用',
    default: true,
  })
  allowComment: boolean;

  @Property({
    comment: '是否置顶 true - 置顶 , false - 不置顶',
    default: false,
  })
  isTop: boolean;

  @Property({
    default: 0,
  })
  order: number;

  @Property({
    default: false,
  })
  allowFeed: boolean;

  @Property({
    default: 0,
  })
  likeNum: number;

  @Property()
  commentCount: number;

  @ManyToMany({ entity: () => Meta, pivotEntity: () => Relationship })
  metas = new Collection<Meta>(this);
}
