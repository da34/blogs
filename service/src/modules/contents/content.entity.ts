import {
  Entity,
  Property,
  PrimaryKey,
  // JoinTable,
  ManyToMany,
  ManyToOne,
  Enum,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
// import { Category } from '../categories/category.entity';
// import { Tag } from '../tags/tag.entity';

export enum TypeContent {
  Article = 'article',
  Draft = 'draft',
  Page = 'page',
}
@Entity()
export class Content {
  @PrimaryKey()
  id: number;

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

  @Property({
    nullable: true,
  })
  path: string; // 页面路径

  @Property({
    type: 'bigint',
    default: 0,
  })
  createdTime: number = Date.now();

  @Property({
    type: 'bigint',
    default: 0,
  })
  updatedTime: number = Date.now();

  @Property()
  permalink?: string;
  // @ManyToOne(() => Category)
  // category: Category;

  @Property()
  commentCount: number;
  // @ManyToMany(() => Tag)
  // @JoinTable({
  //   name: 'contents_tags',
  // })
  // tags: Tag[];
}
