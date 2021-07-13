import { Injectable } from '@nestjs/common';
import { GameActionDTO } from './dto/gameAction.dto';
import { FillCellGameData, GameLogic } from './gamelogic.service';

export enum GameState {
  PREVIEW = 'preview',
  WAIT = 'wait',
  CHOOSE = 'choose',
  RESTART = 'restart',
  PLAY = 'play',
  OVER = 'over',
}

export enum GameReadyState {
  NOT_READY = 'not_ready',
  READY_ONE = 'ready_one',
  READY_ALL = 'ready_all',
}

export enum GamePickState {
  NOONE = 'noone',
  ONE = 'one',
  ALL = 'all',
}

export interface GameUser {
  username: string;
  figure?: string;
  goFirst?: boolean;
  move?: boolean;
}

export class GameData {
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
@Injectable()
export class GameService {
  private games: Game[] = [];

  constructor(private gameLogic: GameLogic) {}

  async joinGame(roomId) {
    return this.games.find((game) => game.id === roomId.roomId);
  }

  async createNewGame(roomId: string) {
    const game: Game = {
      id: roomId,
      players: [],
      readyPlayers: [],
      pickedPlayers: [],
      gameState: GameState.PREVIEW,
      gameReadyState: GameReadyState.NOT_READY,
      gamePickState: GamePickState.NOONE,
      gameData: null,
    };
    this.games.push(game);
    return roomId;
  }

  async addNewUser(gameActionDto: GameActionDTO) {
    const game = await this.getGameById(gameActionDto.roomId);
    const user: GameUser = { username: gameActionDto.username };
    game.players.push(user);
    return game;
  }

  async setPlayerReady(gameActionDto: GameActionDTO) {
    const game = await this.getGameById(gameActionDto.roomId);
    if (
      game.readyPlayers.find((username) => username === gameActionDto.username)
    )
      return;
    game.readyPlayers.push(gameActionDto.username);
    game.gameReadyState = await this.getGameReadyState(gameActionDto);
    if (game.gameReadyState === GameReadyState.READY_ALL) {
      this.setGamePlayState(game);
    }
    return game;
  }

  async setPlayerPicked(gameActionDto: GameActionDTO) {
    const game = await this.getGameById(gameActionDto.roomId);
    if (
      game.pickedPlayers.find((username) => username === gameActionDto.username)
    )
      return;

    const playerInd = game.players.findIndex(
      (player) => player.username === gameActionDto.username,
    );
    if (playerInd !== -1) game.players[playerInd].figure = gameActionDto.figure;
    this.determineFirstMover(game);
    game.pickedPlayers.push(gameActionDto.username);
    game.gamePickState = await this.getGamePickState(gameActionDto);
    return game;
  }

  async changePlayerMove(gameActionDto: GameActionDTO) {
    const game = await this.getGameById(gameActionDto.roomId);
    const moveData: FillCellGameData = {
      cellId: gameActionDto.moveCellId,
      figure: gameActionDto.figure,
      field: game.gameData.field,
    };
    game.gameData = this.gameLogic.fillCell(moveData);
    game.players.forEach((player) => (player.move = !player.move));
    return game;
  }

  async restartGame(gameActionDto: GameActionDTO) {
    const game = await this.getGameById(gameActionDto.roomId);
    this.setGamePlayState(game);
    game.gameState = GameState.RESTART;
    game.players.forEach((player) => {
      if (player.goFirst) player.move = true;
      else player.move = false;
    });
    return game;
  }

  async getGameReadyState(gameActionDto: GameActionDTO) {
    const game = await this.getGameById(gameActionDto.roomId);
    const playerId = gameActionDto.username;
    if (game.readyPlayers.find((player) => player === playerId)) {
      if (game.readyPlayers.length === 2) {
        return GameReadyState.READY_ALL;
      }
      return GameReadyState.READY_ONE;
    }
    return GameReadyState.NOT_READY;
  }

  async getGamePickState(gameActionDto: GameActionDTO) {
    const game = await this.getGameById(gameActionDto.roomId);
    const playerId = gameActionDto.username;
    if (game.pickedPlayers.find((player) => player === playerId)) {
      if (game.pickedPlayers.length === 2) {
        return GamePickState.ALL;
      }
      return GamePickState.ONE;
    }
    return GamePickState.NOONE;
  }

  async removePlayerFromGame(gameActionDto: GameActionDTO) {
    const game = await this.getGameById(gameActionDto.roomId);
    const username = gameActionDto.username;
    game.players = game.players.filter(
      (player) => player.username !== username,
    );
    game.readyPlayers = game.readyPlayers.filter(
      (player) => player != username,
    );
    game.pickedPlayers = game.pickedPlayers.filter(
      (player) => player != username,
    );
    game.gameState = GameState.PREVIEW;
    game.gameReadyState = GameReadyState.NOT_READY;
    game.gamePickState = GamePickState.NOONE;
    return game;
  }

  async getGameUser(game: Game, username: string) {
    const userInd = game.players.findIndex(
      (user) => user.username === username,
    );
    if (userInd === -1)
      throw new Error(`Cannot find user with username={${username}}`);
    const user: GameUser = { ...game.players[userInd] };
    return { user, userInd };
  }

  async getGameById(roomId) {
    return this.games.find((game) => game.id === roomId);
  }

  async getGames() {
    return this.games;
  }

  setGamePlayState(game: Game) {
    game.gameState = GameState.PLAY;
    game.gameData = this.gameLogic.createGameField();
  }

  determineFirstMover(game: Game) {
    game.players[0].goFirst = Math.round(Math.random() * 10) % 2 === 0;
    game.players[1].goFirst = !game.players[0].goFirst;
    game.players[0].move = game.players[0].goFirst;
    game.players[1].move = game.players[1].goFirst;
  }
}
