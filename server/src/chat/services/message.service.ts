import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Messages from '../entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class MessageService {
  constructor(
    @InjectRepository(Messages) private MessageRepository: Repository<Messages>,
  ) {}
  async CreateMessage(msg: string, chat: any, user: any) {
    const mensaje = this.MessageRepository.create({
      mensaje: msg,
      chat: chat,
      usuario: user,
    });
    return await this.MessageRepository.save(mensaje);
  }
}
