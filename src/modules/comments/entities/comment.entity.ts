import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

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
  name: string;

  @Column({
    comment: '被评论人名称',
    nullable: true,
  })
  replyName: string;

  @Column({
    comment: '被评论人邮箱',
    nullable: true,
  })
  replyEmail: string;

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
    comment: '是否是管理员 false - 不是 , true - 是',
    default: false,
  })
  isAdmin: boolean;

  @Column({
    comment: '锚点',
  })
  anchor: string;

  @Column({
    type: 'bigint',
  })
  createTime: number;

  @Column({
    type: 'bigint',
  })
  updateTime: number;

  @Column({
    comment: '评论父级',
    nullable: true,
  })
  parentId: string;

  @Column({
    comment: '资源id',
  })
  postId: string;

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
