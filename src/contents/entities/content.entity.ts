import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';

enum TypeContent {
  ARTICLE = 'article',
  PAGE = 'page',
}

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

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
    enum: TypeContent,
    default: TypeContent.ARTICLE,
  })
  type: string;

  @Column({
    type: 'enum',
    comment: '内容类型 publish - 发布 ,  draft - 草稿,  del - 删除',
    enum: ['publish', 'draft', 'del'],
    default: 'publish',
  })
  status: string;

  @Column({
    default: 0,
  })
  views: number;

  @Column({
    comment: '版权开启 true - 不开启 , false - 开启',
    default: true,
  })
  shareStatement: boolean;

  @Column({
    comment: '评论开启 true - 开启 , false - 禁用',
    default: true,
  })
  isCommentOpen: boolean;

  @Column({
    comment: '是否置顶 true - 置顶 , false - 不置顶',
    default: true,
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

  @OneToMany(() => Comment, (comment) => comment.content)
  comments: Comment[];

  @ManyToOne(() => Category, (category) => category.content)
  category: Category;

  @ManyToMany(() => Tag, {
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
