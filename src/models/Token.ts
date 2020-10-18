import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';

@Entity('tokens')
class Token {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Token;
