import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Content } from '../../contents/entities/content.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    default: 0,
  })
  views: number;

  @OneToMany(() => Content, (content) => content.id)
  content: Content;
}
