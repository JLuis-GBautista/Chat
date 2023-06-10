import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import ChatService from '../services/chat.service';
import UsersService from 'src/users/users.service';
import CreateChatDTO from '../pipes/createChat.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('chats')
export default class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UsersService,
  ) {}
  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async GetAllChatsUser(@Req() req: Request) {
    try {
      const idUser = req.user['id'];
      const userChats = await this.chatService.GetChatsFromUserLimit(idUser);
      const idChats = userChats.map((chat) => chat.id);
      const chats = await this.chatService.GetDataSecondUser(idChats, idUser);
      return chats.map((chat) => {
        return {
          id: chat.id,
          nombre: chat.usuarios[0].nombre,
          foto: chat.usuarios[0].foto.toString('base64'),
          color: chat.color_chat,
        };
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @Get('filterUser')
  @UseGuards(AuthGuard('jwt'))
  async FilterSecondUsers(
    @Query('startName') startName: string,
    @Req() req: Request,
  ) {
    try {
      const idUser = req.user['id'];
      const userChats = await this.chatService.GetChatsFromUser(idUser);
      const idChats = userChats.map((chat) => chat.id);
      const chats = await this.chatService.FindSecondUsersWithSearch(
        idUser,
        idChats,
        startName,
      );
      return chats.map((chat) => {
        return {
          id: chat.id,
          nombre: chat.usuarios[0].nombre,
          foto: chat.usuarios[0].foto.toString('base64'),
          color: chat.color_chat,
        };
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async GetOneChat(@Param('id') id: string, @Req() req: Request) {
    try {
      const idUser = req.user['id'];
      const chat = await this.chatService.GetOneChat(parseInt(id), idUser);
      return { ok: true, chat };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
