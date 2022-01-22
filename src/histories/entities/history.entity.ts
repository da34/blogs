import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from 'class-validator';

@Entity()
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'bigint',
  })
  @IsNumber()
  date: number;

  @Column({
    type: 'json',
  })
  desc: string;
}
