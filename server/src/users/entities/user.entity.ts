import Chats from '../../chat/entities/chat.entity';
import Messages from '../../chat/entities/message.entity';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  nombre: string;

  @Column('date')
  fecha_nacimiento: Date;

  private _edad: number;

  @AfterLoad()
  calcularEdad() {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(this.fecha_nacimiento);
    const diferenciaAnios =
      fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    this._edad = diferenciaAnios;
  }

  get edad(): number {
    return this._edad;
  }

  @Column('bytea', { nullable: true })
  foto: Buffer;

  @Column('varchar', { unique: true })
  correo: string;

  @Column('boolean', { default: false })
  conectado: boolean;

  @Column('varchar')
  clave_acceso: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_edicion: Date;

  @ManyToMany(() => Chats, (chat) => chat.usuarios)
  chats: Chats[];

  @OneToMany(() => Messages, (msg) => msg.usuario)
  mensajes: Messages[];
}
