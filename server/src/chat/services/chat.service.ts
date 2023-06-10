import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Chats from '../entities/chat.entity';
import { In, Like, Not, Repository } from 'typeorm';

@Injectable()
export default class ChatService {
  constructor(
    @InjectRepository(Chats) private ChatsRepository: Repository<Chats>,
  ) {}
  async getChat(id: number) {
    return await this.ChatsRepository.findOne({
      where: {
        id,
      },
    });
  }
  async GetChatsFromUserLimit(id: number) {
    const chats = await this.ChatsRepository.find({
      select: ['id'],
      relations: ['usuarios'],
      where: {
        usuarios: {
          id,
        },
      },
      take: 10,
    });
    return chats;
  }
  async GetChatsFromUser(id: number) {
    const chats = await this.ChatsRepository.find({
      select: ['id'],
      relations: ['usuarios'],
      where: {
        usuarios: {
          id,
        },
      },
    });
    return chats;
  }
  async GetDataSecondUser(ids: number[], id: number) {
    const chats = await this.ChatsRepository.find({
      relations: ['usuarios'],
      where: { id: In(ids), usuarios: { id: Not(id) } },
    });
    return chats;
  }
  async FindSecondUsersWithSearch(
    id: number,
    ids: number[],
    startName: string,
  ) {
    const chats = await this.ChatsRepository.find({
      relations: ['usuarios'],
      take: 10,
      where: {
        usuarios: {
          id: Not(id),
          nombre: Like(`${startName}%`),
        },
        id: In(ids),
      },
    });
    return chats;
  }
  async GetOneChat(id: number, uid: number) {
    return await this.ChatsRepository.findOne({
      where: { id, usuarios: { id: Not(uid) } },
      relations: ['usuarios', 'mensajes', 'mensajes.usuario'],
    });
  }
}
