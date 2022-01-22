import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Content } from '../../contents/entities/content.entity';

@Entity()
export class Category {
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

  @OneToMany(() => Content, (content) => content.category)
  content: Content;
}
