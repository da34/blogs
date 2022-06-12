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
  createdTime: number;

  @Column({
    type: 'bigint',
  })
  updatedTime: number;

  @BeforeInsert()
  createDates() {
    this.createdTime = Date.now();
    this.updatedTime = Date.now();
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedTime = Date.now();
  }

  // @ManyToMany(() => Content, (content) => content.tags)
  // contents: Array<Content>;
}
