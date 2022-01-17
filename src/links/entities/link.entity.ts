import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createTime: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateTime: Date;
}
