import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Category {
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

  // @OneToMany(() => Content, (content) => content.category)
  // content: Content;
}
