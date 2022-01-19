import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  key: string;

  @Column({
    type: 'json',
  })
  value: JSON;
}
