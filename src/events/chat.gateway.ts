import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('chat:join')
  handleJoinChat(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const chatId = `chat${data.roomId}`;
    socket.join(chatId);
    this.server.to(chatId).emit('chat:join', data.message);
  }

  @SubscribeMessage('chat:leave')
  handleChatLeave(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    const chatId = `chat${data.roomId}`;
    socket.leave(chatId);
    this.server.to(chatId).emit('chat:leave', data.message);
  }

  @SubscribeMessage('chat:message')
  handleChatMessage(@MessageBody() data: any) {
    const chatId = `chat${data.roomId}`;
    this.server.to(chatId).emit('chat:message', data.message);
  }

  @SubscribeMessage('chat:message_log')
  handleChatMessageLog(@MessageBody() data: any) {
    const chatId = `chat${data.roomId}`;
    this.server.to(chatId).emit('chat:message_log', data.message);
  }
}
