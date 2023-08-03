import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Chats from './chat.entity';
import Users from '../../users/entities/user.entity';

@Entity({ name: 'mensajes' })
export default class Messages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  mensaje: string;

  @Column('boolean', { default: false })
  visto: boolean;

  @Column('varchar', { nullable: true })
  extra: boolean;

  @CreateDateColumn()
  fecha_creado: Date;

  @UpdateDateColumn()
  fecha_edicion: Date;

  @ManyToOne(() => Users, (user) => user.mensajes)
  usuario: Users;

  @ManyToOne(() => Chats, (chat) => chat.mensajes)
  chat: Chats;
}
