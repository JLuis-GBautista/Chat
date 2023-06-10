import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import UsersService from 'src/users/users.service';
import MessageService from '../services/message.service';
import ChatService from '../services/chat.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:3000' } })
export class WsGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    private readonly userService: UsersService,
  ) {}

  // Evento de conexión
  handleConnection() {
    console.log('Cliente conectado');
    // Puedes realizar acciones adicionales cuando un cliente se conecta, como enviar datos o suscribirse a eventos
  }
  // Evento de desconexión
  handleDisconnect() {
    console.log('Cliente desconectado');
    // Puedes realizar acciones adicionales cuando un cliente se desconecta
  }
  @SubscribeMessage('usuarioConectado')
  async updateConectUser(client: Socket, idUser: number) {
    await this.userService.ConnectUser(idUser, true);
  }
  @SubscribeMessage('desconectar')
  async handleMensajeCliente(client: Socket, idUser: number) {
    console.log('aqui descodectando...');
    await this.userService.ConnectUser(idUser, false);
  }
  @SubscribeMessage('joinRoom')
  subscribeToRoom(client: Socket, room: string) {
    client.join(room);
    console.log(`Cliente se unió a la sala: ${room}`);
  }
  @SubscribeMessage('mensajeChat')
  async handleMensaje(client: Socket, { room, mensaje, idChat, idUser }) {
    const user = await this.userService.Session(idUser);
    const chat = await this.chatService.getChat(idChat);
    await this.messageService.CreateMessage(mensaje, chat, user);
    const newChat = await this.chatService.GetOneChat(idChat, idUser);
    const objString = JSON.stringify(newChat);
    console.log(room);
    client.broadcast.emit('remplaceChat', objString);
  }
}
