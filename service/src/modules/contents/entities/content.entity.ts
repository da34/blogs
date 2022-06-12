import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';

export enum TypeContent {
  Article = 'article',
  Draft = 'draft',
  Page = 'page',
}
@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Exclude()
  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    comment: '内容概览',
    nullable: true,
  })
  briefContent: string;

  @Column({
    comment: '头图',
    nullable: true,
  })
  coverImage: string;

  @Column({
    type: 'enum',
    enum: TypeContent,
    default: TypeContent.Article,
  })
  type: string;

  @Column({
    default: true,
  })
  status: boolean;

  @Column({
    default: 0,
  })
  views: number;

  @Column({
    comment: '评论开启 true - 开启 , false - 禁用',
    default: true,
  })
  allowComment: boolean;

  @Column({
    comment: '是否置顶 true - 置顶 , false - 不置顶',
    default: false,
  })
  isTop: boolean;

  @Column({
    default: 0,
  })
  order: number;

  @Column({
    default: false,
  })
  allowFeed: boolean;

  @Column({
    default: 0,
  })
  likeNum: number;

  @Column({
    nullable: true,
  })
  path: string; // 页面路径

  @Column({ type: 'mediumtext', default: null })
  toc: string; // 格式化内容索引，自动生成

  @Column({
    type: 'bigint',
    default: 0,
  })
  createdTime: number;

  @Column({
    type: 'bigint',
    default: 0,
  })
  updatedTime: number;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'contents_tags',
  })
  tags: Tag[];

  @BeforeInsert()
  createDates() {
    this.createdTime = Date.now();
    this.updatedTime = Date.now();
  }
}
