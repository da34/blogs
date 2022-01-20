import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
  })
  date: string;

  @Column({
    type: 'json',
  })
  desc: string;
}
