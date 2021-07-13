exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 14:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameService = exports.GameData = exports.GamePickState = exports.GameReadyState = exports.GameState = void 0;
const common_1 = __webpack_require__(8);
const gamelogic_service_1 = __webpack_require__(15);
var GameState;
(function (GameState) {
    GameState["PREVIEW"] = "preview";
    GameState["WAIT"] = "wait";
    GameState["CHOOSE"] = "choose";
    GameState["RESTART"] = "restart";
    GameState["PLAY"] = "play";
    GameState["OVER"] = "over";
})(GameState = exports.GameState || (exports.GameState = {}));
var GameReadyState;
(function (GameReadyState) {
    GameReadyState["NOT_READY"] = "not_ready";
    GameReadyState["READY_ONE"] = "ready_one";
    GameReadyState["READY_ALL"] = "ready_all";
})(GameReadyState = exports.GameReadyState || (exports.GameReadyState = {}));
var GamePickState;
(function (GamePickState) {
    GamePickState["NOONE"] = "noone";
    GamePickState["ONE"] = "one";
    GamePickState["ALL"] = "all";
})(GamePickState = exports.GamePickState || (exports.GamePickState = {}));
class GameData {
}
exports.GameData = GameData;
let GameService = class GameService {
    constructor(gameLogic) {
        this.gameLogic = gameLogic;
        this.games = [];
    }
    async joinGame(roomId) {
        return this.games.find((game) => game.id === roomId.roomId);
    }
    async createNewGame(roomId) {
        const game = {
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
    async addNewUser(gameActionDto) {
        const game = await this.getGameById(gameActionDto.roomId);
        if (!game.players.find((user) => user.username === gameActionDto.username)) {
            const user = { username: gameActionDto.username };
            game.players.push(user);
        }
        return game;
    }
    async setPlayerReady(gameActionDto) {
        const game = await this.getGameById(gameActionDto.roomId);
        if (game.readyPlayers.find((username) => username === gameActionDto.username))
            return;
        game.readyPlayers.push(gameActionDto.username);
        game.gameReadyState = await this.getGameReadyState(gameActionDto);
        if (game.gameReadyState === GameReadyState.READY_ALL) {
            this.setGamePlayState(game);
        }
        return game;
    }
    async setPlayerPicked(gameActionDto) {
        const game = await this.getGameById(gameActionDto.roomId);
        if (game.pickedPlayers.find((username) => username === gameActionDto.username))
            return;
        const playerInd = game.players.findIndex((player) => player.username === gameActionDto.username);
        if (playerInd !== -1)
            game.players[playerInd].figure = gameActionDto.figure;
        this.determineFirstMover(game);
        game.pickedPlayers.push(gameActionDto.username);
        game.gamePickState = await this.getGamePickState(gameActionDto);
        return game;
    }
    async changePlayerMove(gameActionDto) {
        const game = await this.getGameById(gameActionDto.roomId);
        const moveData = {
            cellId: gameActionDto.moveCellId,
            figure: gameActionDto.figure,
            field: game.gameData.field,
        };
        game.gameData = this.gameLogic.fillCell(moveData);
        game.players.forEach((player) => (player.move = !player.move));
        return game;
    }
    async restartGame(gameActionDto) {
        const game = await this.getGameById(gameActionDto.roomId);
        this.setGamePlayState(game);
        game.gameState = GameState.RESTART;
        game.players.forEach((player) => {
            if (player.goFirst)
                player.move = true;
            else
                player.move = false;
        });
        return game;
    }
    async getGameReadyState(gameActionDto) {
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
    async getGamePickState(gameActionDto) {
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
    async removePlayerFromGame(gameActionDto) {
        const game = await this.getGameById(gameActionDto.roomId);
        const username = gameActionDto.username;
        game.players = game.players.filter((player) => player.username !== username);
        game.readyPlayers = [];
        game.pickedPlayers = [];
        game.gameState = GameState.PREVIEW;
        game.gameReadyState = GameReadyState.NOT_READY;
        game.gamePickState = GamePickState.NOONE;
        game.players[0] = { username: game.players[0].username };
        return game;
    }
    async getGameUser(game, username) {
        const userInd = game.players.findIndex((user) => user.username === username);
        if (userInd === -1)
            throw new Error(`Cannot find user with username={${username}}`);
        const user = Object.assign({}, game.players[userInd]);
        return { user, userInd };
    }
    async getGameById(roomId) {
        return this.games.find((game) => game.id === roomId);
    }
    async getGames() {
        return this.games;
    }
    setGamePlayState(game) {
        game.gameState = GameState.PLAY;
        game.gameData = this.gameLogic.createGameField();
    }
    determineFirstMover(game) {
        game.players[0].goFirst = Math.round(Math.random() * 10) % 2 === 0;
        game.players[1].goFirst = !game.players[0].goFirst;
        game.players[0].move = game.players[0].goFirst;
        game.players[1].move = game.players[1].goFirst;
    }
};
GameService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof gamelogic_service_1.GameLogic !== "undefined" && gamelogic_service_1.GameLogic) === "function" ? _a : Object])
], GameService);
exports.GameService = GameService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ed8fa35ac359fedd85a7")
/******/ })();
/******/ 
/******/ }
;