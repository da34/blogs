import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Content } from '../../contents/entities/content.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

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
    this.updateTime = Date.now();
  }

  @BeforeUpdate()
  updateDates() {
    this.updateTime = Date.now();
  }

  // @ManyToMany(() => Content, (content) => content.tags)
  // contents: Array<Content>;
}
