import { Module } from '@nestjs/common';
import ChatService from './services/chat.service';
import ChatController from './controllers/chat.controller';
import { WsGateway } from './ws/ws.gateway';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Chats from './entities/chat.entity';
import Messages from './entities/message.entity';
import MessageService from './services/message.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Chats, Messages])],
  controllers: [ChatController],
  providers: [ChatService, WsGateway, MessageService],
  exports: [ChatModule],
})
export class ChatModule {}
