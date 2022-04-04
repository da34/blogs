import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

export enum StatusComment {
  Pass = 'pass',
  Block = 'block',
  Review = 'review',
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  coid: number;

  @Column()
  cid: number;

  @Column()
  ip: string;

  @Column('text')
  text;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column({
    comment: '评论人名称',
  })
  authorName: string;

  @Column({
    type: 'enum',
    comment: '状态 pass 正常， block 不通过, review - 需要人工复查',
    enum: StatusComment,
  })
  status: string;

  // @Column({
  //   type: 'text',
  //   comment: '相关检测结果详细信息',
  // })
  // suggestion: string;

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
    type: 'bigint',
  })
  createTime: number;

  @Column({
    comment: '评论父级',
  })
  parentId: number;

  @Column()
  authorId: number;

  @Column()
  agent: string;

  @Column()
  system: string;

  // @Column()
  // type: string;

  @BeforeInsert()
  createDates() {
    this.createTime = Date.now();
    this.putTop = false;
  }
}
