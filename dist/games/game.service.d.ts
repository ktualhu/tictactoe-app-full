import { GameActionDTO } from './dto/gameAction.dto';
import { GameLogic } from './gamelogic.service';
export declare enum GameState {
    PREVIEW = "preview",
    WAIT = "wait",
    CHOOSE = "choose",
    RESTART = "restart",
    PLAY = "play",
    OVER = "over"
}
export declare enum GameReadyState {
    NOT_READY = "not_ready",
    READY_ONE = "ready_one",
    READY_ALL = "ready_all"
}
export declare enum GamePickState {
    NOONE = "noone",
    ONE = "one",
    ALL = "all"
}
export interface GameUser {
    username: string;
    figure?: string;
    goFirst?: boolean;
    move?: boolean;
}
export declare class GameData {
    field: string[];
    won: boolean;
    winStrickCells?: number[];
}
export interface Game {
    id: string;
    players: GameUser[];
    readyPlayers: string[];
    pickedPlayers: string[];
    gameState: GameState;
    gameReadyState: GameReadyState;
    gamePickState: GamePickState;
    gameData: GameData;
}
export declare class GameService {
    private gameLogic;
    private games;
    constructor(gameLogic: GameLogic);
    joinGame(roomId: any): Promise<Game>;
    createNewGame(roomId: string): Promise<string>;
    addNewUser(gameActionDto: GameActionDTO): Promise<Game>;
    setPlayerReady(gameActionDto: GameActionDTO): Promise<Game>;
    setPlayerPicked(gameActionDto: GameActionDTO): Promise<Game>;
    changePlayerMove(gameActionDto: GameActionDTO): Promise<Game>;
    restartGame(gameActionDto: GameActionDTO): Promise<Game>;
    getGameReadyState(gameActionDto: GameActionDTO): Promise<GameReadyState>;
    getGamePickState(gameActionDto: GameActionDTO): Promise<GamePickState>;
    removePlayerFromGame(gameActionDto: GameActionDTO): Promise<Game>;
    getGameUser(game: Game, username: string): Promise<{
        user: GameUser;
        userInd: number;
    }>;
    getGameById(roomId: any): Promise<Game>;
    getGames(): Promise<Game[]>;
    setGamePlayState(game: Game): void;
    determineFirstMover(game: Game): void;
}
