import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Exclude } from 'class-transformer';

export enum StatusContent {
  Publish = 'publish',
  Draft = 'draft',
}

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  title: string;

  @Exclude()
  @Column({
    type: 'text',
  })
  content: string;

  @Column({
    comment: '内容概览',
  })
  contentOutline: string;

  @Column({
    comment: '头图',
    nullable: true,
  })
  firstPicture: string;

  @Column({
    type: 'enum',
    comment: '内容类型 publish - 发布 ,  draft - 草稿',
    enum: StatusContent,
    default: StatusContent.Publish,
  })
  status: string;

  @Column({
    default: 0,
  })
  views: number;

  @Column({
    comment: '版权开启 true - 开启 , false - 不开启',
    default: true,
  })
  isShare: boolean;

  @Column({
    comment: '评论开启 true - 开启 , false - 禁用',
    default: true,
  })
  isCommentOpen: boolean;

  @Column({
    comment: '是否置顶 true - 置顶 , false - 不置顶',
    default: false,
  })
  isTop: boolean;

  @Column({
    default: 0,
  })
  likeNum: number;

  @Column({
    type: 'bigint',
  })
  createTime: number;

  @Column({
    type: 'bigint',
  })
  updateTime: number;

  @ManyToOne(() => Category, (category) => category.content)
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.contents, {
    cascade: true,
  })
  @JoinTable()
  tags: Tag[];

  @BeforeInsert()
  createDates() {
    this.createTime = Date.now();
    this.updateTime = Date.now();
  }

  @BeforeUpdate()
  updateDates() {
    this.updateTime = Date.now();
  }
}
