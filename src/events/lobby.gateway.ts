import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';
import { Room, RoomsService } from 'src/rooms/rooms.service';
import { GameService } from 'src/games/game.service';

@WebSocketGateway()
export class LobbyGateway implements OnGatewayInit {
  private logger = new Logger('LobbyGateway');

  constructor(
    private readonly roomsService: RoomsService,
    private readonly gameService: GameService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('user:join')
  handleUserJoin(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('user:join', data);
  }

  @SubscribeMessage('room:create')
  handleCreateRoom(
    @MessageBody() data: Room,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log('room:create');

    socket.broadcast.emit('room:create', data);
  }

  @SubscribeMessage('room:add_user')
  async handleAddUser(@MessageBody() data: any) {
    try {
      const updatedRoom = await this.roomsService.addUser(
        data.id,
        data.username,
      );
      this.server.emit('room:add_user', updatedRoom);
    } catch (error) {
      console.error(error);
    }
  }

  @SubscribeMessage('room:remove_user')
  async handleRemoveUser(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ) {
    try {
      const updatedRoom = await this.roomsService.removeUser(
        data.id,
        data.username,
      );
      const game = await this.gameService.removePlayerFromGame({
        roomId: data.id,
        username: data.username,
      });
      // socket.broadcast.emit('room:remove_user', { room: updatedRoom, game });
      this.server.emit('room:remove_user', { room: updatedRoom, game });
    } catch (error) {
      console.error(error);
    }
  }

  afterInit(server: Server) {
    this.logger.log('init');
  }
}
