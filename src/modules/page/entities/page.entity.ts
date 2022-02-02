import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  path: string;

  @Column({ type: 'int', default: 0 })
  order: number; // 排序

  @Column({
    comment: '评论开启 true - 开启 , false - 禁用',
    default: true,
  })
  isCommentOpen: boolean;

  @Exclude()
  @Column({ type: 'text', default: null })
  content: string;

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string;

  @Column({ type: 'bigint' })
  publishAt: number;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({
    type: 'bigint',
  })
  createTime: number;

  @Column({
    type: 'bigint',
  })
  updateTime: number;

  @BeforeInsert()
  createDates() {
    this.createTime = Date.now();
    this.publishAt = Date.now();
    this.updateTime = Date.now();
  }

  @BeforeUpdate()
  updateDates() {
    this.updateTime = Date.now();
  }
}
