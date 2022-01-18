import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: number;

  @Column({
    type: 'json',
  })
  desc: string;
}
