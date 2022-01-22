import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Content } from '../../contents/entities/content.entity';

export enum StatusComment {
  Pass = 'pass',
  Block = 'block',
  Review = 'review',
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ip: string;

  @Column()
  ua: string;

  @Column('text')
  text;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column({
    comment: '评论人名称',
  })
  nickName: string;

  @Column({
    comment: '被评论人名称',
    nullable: true,
  })
  targetName: string;

  @Column({
    type: 'enum',
    comment: '状态 pass 正常， block 不通过, review - 需要人工复查',
    enum: StatusComment,
  })
  status: string;

  @Column({
    type: 'text',
    comment: '相关检测结果详细信息',
  })
  suggestion: string;

  @Column({
    comment: '是否置顶 false - 不置顶 , true - 置顶',
    default: false,
  })
  putTop: boolean;

  @Column({
    comment: '锚点',
  })
  anchor: string;

  @Column({
    comment: '通知： true- 未通知 , false - 已通知',
    default: false,
  })
  isNotified: boolean;

  @Column({
    comment: '真实评论父级',
    nullable: true,
  })
  pid: string;

  @Column({
    type: 'bigint',
  })
  createTime: number;

  @Column({
    type: 'bigint',
  })
  updateTime: number;

  @ManyToOne(() => Content, (content) => content.comments, {
    createForeignKeyConstraints: false,
  })
  content: Content;

  @ManyToOne(() => Comment, (comment) => comment.childComments)
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComments: Comment[];

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
