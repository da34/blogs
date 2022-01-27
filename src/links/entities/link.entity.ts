import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatar: string;

  @Column()
  outline: string;

  @Column()
  URL: string;

  @Column()
  name: string;

  @Column({
    comment: '友联状态 true - 正常, false - 无效',
    default: true,
  })
  isValid: boolean;

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
}
