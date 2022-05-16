import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { ApiProperty } from '@nestjs/swagger';
import { ReceiveMessageDto } from './dto/receive.message.dto';
import prisma from '../client';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() server;
  users = 0;

  // async handleConnection() {
  //   // A client has connected
  //   this.users++;
  //   // Notify connected clients of current users
  //   this.server.emit('users', this.users);
  // }
  //
  // async handleDisconnect() {
  //   // A client has disconnected
  //   this.users--;
  //   // Notify connected clients of current users
  //   this.server.emit('users', this.users);
  // }
  //
  // @SubscribeMessage('chat')
  // async onChat(client, message) {
  //   client.broadcast.emit('chat', message);
  // }

  @SubscribeMessage('messageFromClient')
  async handleEvent(@MessageBody() message: ReceiveMessageDto) {
    console.log(message);
    const user = await prisma.user.findUnique({
      where: { id: 'c7a18e82-6741-4b29-bd58-26a84c5e2088' },
    });
    this.server.emit('messageFromServer', {
      content: message.content,
      createdAt: new Date(),
      author: user,
      chatId: message.chatId,
    });
    // return {
    //   content: message.content,
    //   createdAt: new Date(),
    //   author: user,
    //   chatId: message.chatId,
    // };
  }
}
