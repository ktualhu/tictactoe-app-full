import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameActionDTO } from 'src/games/dto/gameAction.dto';
import { GameService } from 'src/games/game.service';
@WebSocketGateway({ namespace: '/game' })
export class GameGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('game:join')
  async handleGameJoin(
    @MessageBody() gameActionDto: GameActionDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    const gameId = `game${gameActionDto.roomId}`;
    const game = await this.gameService.addNewUser(gameActionDto);
    socket.join(gameId);
    this.server.to(gameId).emit('game:join', game);
  }

  @SubscribeMessage('game:pick')
  async handleGamePick(
    @MessageBody() gameActionDto: GameActionDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    const gameId = `game${gameActionDto.roomId}`;
    const game = await this.gameService.setPlayerPicked(gameActionDto);
    if (game.pickedPlayers.length === 2) {
      this.server.to(gameId).emit('game:pick', game);
    } else {
      socket.emit('game:pick', game);
    }
  }

  @SubscribeMessage('game:over')
  async handleGameOver(@MessageBody() gameActionDto: GameActionDTO) {
    const gameId = `game${gameActionDto.roomId}`;
    this.server.to(gameId).emit('game:over');
  }

  @SubscribeMessage('game:ready')
  async handleGameReady(
    @MessageBody() gameActionDto: GameActionDTO,
    @ConnectedSocket() socket: Socket,
  ) {
    const gameId = `game${gameActionDto.roomId}`;
    const game = await this.gameService.setPlayerReady(gameActionDto);
    if (game.readyPlayers.length === 2) {
      this.server.to(gameId).emit('game:ready', game);
    } else {
      socket.emit('game:ready', game);
    }
  }

  @SubscribeMessage('game:move')
  async handleGameMove(@MessageBody() gameActionDto: GameActionDTO) {
    const gameId = `game${gameActionDto.roomId}`;
    const game = await this.gameService.changePlayerMove(gameActionDto);
    this.server.to(gameId).emit('game:move', game);
  }

  // @SubscribeMessage('game:leave')
  // async handleGameLeave(
  //   @MessageBody() gameActionDto: GameActionDTO,
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   console.log('game:leave', gameActionDto);

  //   const gameId = `game${gameActionDto.roomId}`;
  //   const game = await this.gameService.removePlayerFromGame(gameActionDto);
  //   socket.leave(gameId);
  //   this.server.to(gameId).emit('game:leave', game);
  // }

  @SubscribeMessage('game:restart')
  async handleGameRestart(@MessageBody() gameActionDto: GameActionDTO) {
    const gameId = `game${gameActionDto.roomId}`;
    const game = await this.gameService.restartGame(gameActionDto);
    this.server.to(gameId).emit('game:restart', game);
  }
}
