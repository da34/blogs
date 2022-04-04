import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';

export enum TypeContent {
  Article = 'Article',
  Draft = 'draft',
  Page = 'page',
}
@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  title: string;

  @Exclude()
  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    comment: '内容概览',
  })
  description: string;

  @Column({
    comment: '头图',
    nullable: true,
  })
  firstPicture: string;

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
    default: false,
  })
  allowFeed: boolean;

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

  // @ManyToOne(() => Category, (category) => category.content)
  // category: Category;
  //
  // @ManyToMany(() => Tag, (tag) => tag.contents, {
  //   cascade: true,
  // })
  // @JoinTable()
  // tags: Tag[];

  @BeforeInsert()
  createDates() {
    this.createTime = Date.now();
    this.updateTime = Date.now();
  }
}
