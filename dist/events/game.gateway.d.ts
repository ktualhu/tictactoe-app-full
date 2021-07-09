import { Server, Socket } from 'socket.io';
import { GameActionDTO } from 'src/games/dto/gameAction.dto';
import { GameService } from 'src/games/game.service';
export declare class GameGateway {
    private readonly gameService;
    server: Server;
    constructor(gameService: GameService);
    handleGameJoin(gameActionDto: GameActionDTO, socket: Socket): Promise<void>;
    handleGamePick(gameActionDto: GameActionDTO, socket: Socket): Promise<void>;
    handleGameOver(gameActionDto: GameActionDTO): Promise<void>;
    handleGameReady(gameActionDto: GameActionDTO, socket: Socket): Promise<void>;
    handleGameMove(gameActionDto: GameActionDTO): Promise<void>;
    handleGameRestart(gameActionDto: GameActionDTO): Promise<void>;
    handleGameLeave(gameActionDto: GameActionDTO, socket: Socket): Promise<void>;
}
