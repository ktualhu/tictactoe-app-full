import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

import { options } from './lobby.gateway';

const curOptions = {
  ...options,
  namespace: '/room',
};

@WebSocketGateway(5001, curOptions)
export class RoomGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('room:join')
  handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.join(data.roomId);
    this.server.to(data.roomId).emit('room:join', data.username);
  }

  @SubscribeMessage('room:leave')
  handleLeaveRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
    socket.leave(data.roomId);
    this.server.to(data.roomId).emit('room:leave', data.username);
  }

  @SubscribeMessage('room:private')
  handlePrivateRoom(@MessageBody() data: any) {
    this.server.to(data.roomId).emit('room:private', data.username);
  }
}
