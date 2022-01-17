import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Content } from '../contents/content.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  views: number;

  @OneToMany(() => Content, (content) => content.id)
  content: Content;
}
