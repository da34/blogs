import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;

  @OneToMany(() => Comment, (comment) => comment.content)
  comments: Comment[];

  @OneToOne(() => Category, (_class) => _class.id)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}
