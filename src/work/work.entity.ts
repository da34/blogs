import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imgUrl: string;

  @Column()
  name: string;

  @Column({
    default: 0,
    comment: '排序',
  })
  priority: number;

  @Column()
  desc: string;

  @Column()
  linkUrl: string;

  @Column()
  sourceUrl: string;
}
