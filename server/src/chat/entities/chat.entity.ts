import Users from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Messages from './message.entity';

@Entity({ name: 'chats' })
export default class Chats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 7 })
  color_chat: string;

  @Column('varchar', { length: 38 })
  salaId: string;

  @CreateDateColumn()
  fecha_creado: Date;

  @OneToMany(() => Messages, (msg) => msg.chat)
  mensajes: Messages[];

  @Column('varchar', { nullable: true })
  extra: string;

  @Column('varchar', { nullable: true })
  extra2: string;

  @ManyToMany(() => Users, (user) => user.chats)
  @JoinTable({
    name: 'chats_usuarios',
    joinColumn: {
      name: 'chatId',
    },
    inverseJoinColumn: {
      name: 'usuarioId',
    },
  })
  usuarios: Users[];
}
