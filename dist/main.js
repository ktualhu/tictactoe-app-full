/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 0;
	var log = __webpack_require__(1);

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const platform_socket_io_1 = __webpack_require__(5);
const cookieParser = __webpack_require__(6);
const app_module_1 = __webpack_require__(7);
const not_found_filter_1 = __webpack_require__(40);
const path_1 = __webpack_require__(31);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: 'http://127.0.0.1:3000',
            credentials: true,
            methods: ['GET', 'POST'],
        },
    });
    app.useStaticAssets(path_1.join(__dirname, '..', 'client/build'));
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.useGlobalFilters(new not_found_filter_1.NotFoundExceptionFilter());
    app.use(cookieParser());
    await app.listen(process.env.PORT || 5000);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");;

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-socket.io");;

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");;

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(8);
const app_controller_1 = __webpack_require__(9);
const auth_module_1 = __webpack_require__(16);
const events_module_1 = __webpack_require__(25);
const game_module_1 = __webpack_require__(26);
const rooms_module_1 = __webpack_require__(29);
const users_module_1 = __webpack_require__(18);
const users_service_1 = __webpack_require__(19);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [auth_module_1.AuthModule, users_module_1.UsersModule, rooms_module_1.RoomsModule, events_module_1.EventsModule, game_module_1.GameModule],
        controllers: [app_controller_1.AppController],
        providers: [users_service_1.UsersService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");;

/***/ }),
/* 9 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = exports.LobbyDto = void 0;
const common_1 = __webpack_require__(8);
const express_1 = __webpack_require__(10);
const isauth_guard_1 = __webpack_require__(11);
const rooms_service_1 = __webpack_require__(12);
class LobbyDto {
}
exports.LobbyDto = LobbyDto;
let AppController = class AppController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async getIndex() {
        return 'index';
    }
    async getIsAuth(req, res) {
        let data = {
            username: null,
            roomId: null,
        };
        if (req.cookies.username) {
            const room = await this.roomService.getRoomById(req.cookies.room_id);
            if (req.cookies.room_id && !room) {
                data = {
                    username: req.cookies.username,
                    roomId: null,
                };
                res.clearCookie('room_id').json(data);
                return data;
            }
            data = {
                username: req.cookies.username,
                roomId: req.cookies.room_id,
            };
        }
        return res.json(data);
    }
};
__decorate([
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AppController.prototype, "getIndex", null);
__decorate([
    common_1.Get('/isAuth'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AppController.prototype, "getIsAuth", null);
AppController = __decorate([
    common_1.UseGuards(isauth_guard_1.IsAuthGuard),
    common_1.Controller(),
    __metadata("design:paramtypes", [typeof (_e = typeof rooms_service_1.RoomsService !== "undefined" && rooms_service_1.RoomsService) === "function" ? _e : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsAuthGuard = void 0;
const common_1 = __webpack_require__(8);
let IsAuthGuard = class IsAuthGuard {
    canActivate(context) {
        return true;
    }
};
IsAuthGuard = __decorate([
    common_1.Injectable()
], IsAuthGuard);
exports.IsAuthGuard = IsAuthGuard;


/***/ }),
/* 12 */
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
exports.RoomsService = exports.RoomUpdatePrefix = exports.Room = void 0;
const common_1 = __webpack_require__(8);
const uuid_1 = __webpack_require__(13);
const game_service_1 = __webpack_require__(14);
class Room {
}
exports.Room = Room;
var RoomUpdatePrefix;
(function (RoomUpdatePrefix) {
    RoomUpdatePrefix["INC"] = "inc";
    RoomUpdatePrefix["DEC"] = "dec";
})(RoomUpdatePrefix = exports.RoomUpdatePrefix || (exports.RoomUpdatePrefix = {}));
let RoomsService = class RoomsService {
    constructor(gameService) {
        this.gameService = gameService;
        this.rooms = [];
        this.findUserInRoom = (room, username) => {
            return room.roomUsers.findIndex((user) => user.username === username);
        };
    }
    async createRoom(createRoomDto) {
        const room = {
            roomId: uuid_1.v4(),
            roomTitle: createRoomDto.roomTitle,
            roomPrivate: createRoomDto.roomPrivate,
            roomUsers: [],
        };
        room.roomPrivate && (room.roomPassword = createRoomDto.roomPassword);
        this.rooms.push(room);
        await this.gameService.createNewGame(room.roomId);
        return room;
    }
    async getRoomById(id) {
        const room = this.rooms.find((room) => room.roomId === id) || null;
        return room;
    }
    async addUser(roomId, username) {
        try {
            const room = (await this.getRoomById(roomId));
            if (this.findUserInRoom(room, username) === -1) {
                room.roomUsers.push({ username });
            }
            return room;
        }
        catch (error) {
            console.error(error);
        }
    }
    async removeUser(roomId, username) {
        try {
            const room = (await this.getRoomById(roomId));
            const index = this.findUserInRoom(room, username);
            if (index !== -1) {
                room.roomUsers.splice(index, 1);
            }
            return room;
        }
        catch (error) {
            console.error(error);
        }
    }
    async getRooms() {
        return this.rooms;
    }
};
RoomsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof game_service_1.GameService !== "undefined" && game_service_1.GameService) === "function" ? _a : Object])
], RoomsService);
exports.RoomsService = RoomsService;


/***/ }),
/* 13 */
/***/ ((module) => {

"use strict";
module.exports = require("uuid");;

/***/ }),
/* 14 */
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
        if (game.players[0]) {
            const otherPlayerName = game.players[0].username;
            game.players[0] = { username: otherPlayerName };
        }
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


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameLogic = exports.FIELD_LENGTH = void 0;
const common_1 = __webpack_require__(8);
exports.FIELD_LENGTH = 9;
let GameLogic = class GameLogic {
    constructor() {
        this.fieldTemplate = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];
        this.winStrickFigures = [];
    }
    createGameField() {
        const field = [];
        const gameData = {};
        for (let i = 0; i < exports.FIELD_LENGTH; i++) {
            field[i] = '';
        }
        gameData.field = field;
        gameData.won = false;
        return gameData;
    }
    fillCell(fillCellData) {
        const field = fillCellData.field;
        if (!field[fillCellData.cellId])
            field[fillCellData.cellId] = fillCellData.figure;
        return this.checkWinner(field, fillCellData.figure);
    }
    checkWinner(field, figure) {
        const checkResultData = { field, won: false };
        if (this.checkHorVert(field, figure) || this.checkDiag(field, figure)) {
            checkResultData.field = field;
            checkResultData.won = true;
            checkResultData.winStrickCells = this.winStrickFigures;
        }
        else {
            checkResultData.field = field;
            checkResultData.won = false;
        }
        return checkResultData;
    }
    checkHorVert(field, figure) {
        let vertStrick = 0;
        let horStrick = 0;
        let horWinStrickFigures = [];
        let vertWinStrickFigures = [];
        for (let i = 0; i < 3; i++) {
            vertStrick = 0;
            for (let j = 0; j < 3; j++) {
                if (field[this.fieldTemplate[i][j] - 1] === figure) {
                    horStrick++;
                    horWinStrickFigures.push(this.fieldTemplate[i][j] - 1);
                }
                else {
                    horStrick = 0;
                    horWinStrickFigures = [];
                }
                if (field[this.fieldTemplate[j][i] - 1] === figure) {
                    vertStrick++;
                    vertWinStrickFigures.push(this.fieldTemplate[j][i] - 1);
                }
                else {
                    vertStrick = 0;
                    vertWinStrickFigures = [];
                }
            }
            if (vertStrick === 3 || horStrick === 3) {
                horWinStrickFigures.length === 3
                    ? (this.winStrickFigures = horWinStrickFigures)
                    : (this.winStrickFigures = vertWinStrickFigures);
                break;
            }
        }
        return vertStrick === 3 || horStrick === 3;
    }
    checkDiag(field, figure) {
        let diagStrick = 0;
        let diagWinStrickFigures = [];
        for (let i = 0; i < 3; i++) {
            if (field[this.fieldTemplate[i][i] - 1] === figure) {
                diagWinStrickFigures.push(this.fieldTemplate[i][i] - 1);
                diagStrick++;
                continue;
            }
            if (i === 0) {
                for (let j = 2; j >= 0; j--) {
                    if (field[this.fieldTemplate[i][j] - 1] === figure) {
                        diagWinStrickFigures.push(this.fieldTemplate[i][j] - 1);
                        i++;
                        diagStrick++;
                    }
                    else {
                        diagStrick = 0;
                        diagWinStrickFigures = [];
                        break;
                    }
                }
            }
        }
        if (diagWinStrickFigures.length === 3)
            this.winStrickFigures = diagWinStrickFigures;
        return diagStrick === 3;
    }
};
GameLogic = __decorate([
    common_1.Injectable()
], GameLogic);
exports.GameLogic = GameLogic;


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(17);
const users_module_1 = __webpack_require__(18);
const auth_controller_1 = __webpack_require__(20);
const auth_service_1 = __webpack_require__(22);
const local_strategy_1 = __webpack_require__(23);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [users_module_1.UsersModule, passport_1.PassportModule],
        providers: [local_strategy_1.LocalStrategy, auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");;

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(8);
const users_service_1 = __webpack_require__(19);
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = exports.User = void 0;
const common_1 = __webpack_require__(8);
class User {
}
exports.User = User;
let UsersService = class UsersService {
    constructor() {
        this.users = [];
        this.currentUser = null;
    }
    async findOne(username) {
        return this.users.find((user) => user.username === username);
    }
    async getCurrentUser() {
        return this.currentUser;
    }
    setCurrentUser(user) {
        this.currentUser = user;
    }
};
UsersService = __decorate([
    common_1.Injectable()
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 20 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(8);
const express_1 = __webpack_require__(10);
const users_service_1 = __webpack_require__(19);
const auth_guard_1 = __webpack_require__(21);
let AuthController = class AuthController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async login(req) {
        this.usersService.setCurrentUser(req.body);
        return req.body;
    }
    async logout(res) {
        return res.clearCookie('username').send('Successfuly logout!');
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('/login'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('/logout'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    common_1.Controller('/auth'),
    __metadata("design:paramtypes", [typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(8);
let AuthGuard = class AuthGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const user = request.body;
        response.cookie('username', user.username);
        return true;
    }
};
AuthGuard = __decorate([
    common_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;


/***/ }),
/* 22 */
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
exports.AuthService = void 0;
const common_1 = __webpack_require__(8);
const users_service_1 = __webpack_require__(19);
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async validateUser(username) {
        const user = await this.userService.findOne(username);
        return null;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 23 */
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
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(8);
const passport_1 = __webpack_require__(17);
const passport_local_1 = __webpack_require__(24);
const auth_service_1 = __webpack_require__(22);
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(username) {
        const user = await this.authService.validateUser(username);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 24 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-local");;

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsModule = void 0;
const common_1 = __webpack_require__(8);
const game_module_1 = __webpack_require__(26);
const rooms_module_1 = __webpack_require__(29);
const chat_gateway_1 = __webpack_require__(34);
const game_gateway_1 = __webpack_require__(37);
const lobby_gateway_1 = __webpack_require__(38);
const room_gateway_1 = __webpack_require__(39);
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    common_1.Module({
        imports: [rooms_module_1.RoomsModule, game_module_1.GameModule],
        providers: [lobby_gateway_1.LobbyGateway, room_gateway_1.RoomGateway, chat_gateway_1.ChatGateway, game_gateway_1.GameGateway],
    })
], EventsModule);
exports.EventsModule = EventsModule;


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameModule = void 0;
const common_1 = __webpack_require__(8);
const game_controller_1 = __webpack_require__(27);
const game_service_1 = __webpack_require__(14);
const gamelogic_service_1 = __webpack_require__(15);
let GameModule = class GameModule {
};
GameModule = __decorate([
    common_1.Module({
        providers: [game_service_1.GameService, gamelogic_service_1.GameLogic],
        controllers: [game_controller_1.GameController],
        exports: [game_service_1.GameService],
    })
], GameModule);
exports.GameModule = GameModule;


/***/ }),
/* 27 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameController = void 0;
const common_1 = __webpack_require__(8);
const isauth_guard_1 = __webpack_require__(11);
const gameAction_dto_1 = __webpack_require__(28);
const game_service_1 = __webpack_require__(14);
let GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async joinGame(gameActionDto) {
        return await this.gameService.setPlayerReady(gameActionDto);
    }
};
__decorate([
    common_1.Post('/ready'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof gameAction_dto_1.GameActionDTO !== "undefined" && gameAction_dto_1.GameActionDTO) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "joinGame", null);
GameController = __decorate([
    common_1.UseGuards(isauth_guard_1.IsAuthGuard),
    common_1.Controller('/game'),
    __metadata("design:paramtypes", [typeof (_b = typeof game_service_1.GameService !== "undefined" && game_service_1.GameService) === "function" ? _b : Object])
], GameController);
exports.GameController = GameController;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameActionDTO = void 0;
class GameActionDTO {
}
exports.GameActionDTO = GameActionDTO;


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsModule = void 0;
const common_1 = __webpack_require__(8);
const game_module_1 = __webpack_require__(26);
const rooms_controller_1 = __webpack_require__(30);
const rooms_service_1 = __webpack_require__(12);
let RoomsModule = class RoomsModule {
};
RoomsModule = __decorate([
    common_1.Module({
        imports: [game_module_1.GameModule],
        providers: [rooms_service_1.RoomsService],
        controllers: [rooms_controller_1.RoomsController],
        exports: [rooms_service_1.RoomsService],
    })
], RoomsModule);
exports.RoomsModule = RoomsModule;


/***/ }),
/* 30 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomsController = void 0;
const common_1 = __webpack_require__(8);
const express_1 = __webpack_require__(10);
const path_1 = __webpack_require__(31);
const isauth_guard_1 = __webpack_require__(11);
const createRoom_dto_1 = __webpack_require__(32);
const joinRoom_dto_1 = __webpack_require__(33);
const rooms_service_1 = __webpack_require__(12);
let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    async getAllRooms(req) {
        if (req.cookies.room_id && (await this.roomsService.getRooms()).length) {
            try {
                const room_id = req.cookies.room_id;
                return await {
                    rooms: await this.roomsService.getRooms(),
                    room_id,
                };
            }
            catch (error) {
                console.error(error);
            }
        }
        return { rooms: await this.roomsService.getRooms() };
    }
    async createRoom(createRoom) {
        return await this.roomsService.createRoom(createRoom);
    }
    async getRoomById(id, res) {
        const room = await this.roomsService.getRoomById(id);
        if (!room) {
            throw new common_1.NotFoundException();
        }
        res.sendFile(path_1.join(__dirname, '..', 'client/build/index.html'));
    }
    async joinRoom(joinRoom, res) {
        const room = await this.roomsService.getRoomById(joinRoom.roomId);
        if (!room)
            return;
        if (room.roomPassword) {
            if (room.roomPassword === joinRoom.password) {
                return await res.cookie('room_id', joinRoom.roomId).json(room);
            }
            else {
                throw new common_1.HttpException('Wrong password!', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
        }
        else {
            return await res.cookie('room_id', joinRoom.roomId).json(room);
        }
    }
    async leaveRoom(res) {
        return res.clearCookie('room_id').send();
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getAllRooms", null);
__decorate([
    common_1.Post('/new'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof createRoom_dto_1.CreateRoomDTO !== "undefined" && createRoom_dto_1.CreateRoomDTO) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "createRoom", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRoomById", null);
__decorate([
    common_1.Post('/join'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof joinRoom_dto_1.JoinRoomDTO !== "undefined" && joinRoom_dto_1.JoinRoomDTO) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "joinRoom", null);
__decorate([
    common_1.Post('/leave'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "leaveRoom", null);
RoomsController = __decorate([
    common_1.UseGuards(isauth_guard_1.IsAuthGuard),
    common_1.Controller('/rooms'),
    __metadata("design:paramtypes", [typeof (_g = typeof rooms_service_1.RoomsService !== "undefined" && rooms_service_1.RoomsService) === "function" ? _g : Object])
], RoomsController);
exports.RoomsController = RoomsController;


/***/ }),
/* 31 */
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRoomDTO = void 0;
class CreateRoomDTO {
}
exports.CreateRoomDTO = CreateRoomDTO;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JoinRoomDTO = void 0;
class JoinRoomDTO {
}
exports.JoinRoomDTO = JoinRoomDTO;


/***/ }),
/* 34 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const websockets_1 = __webpack_require__(35);
const socket_io_1 = __webpack_require__(36);
let ChatGateway = class ChatGateway {
    handleJoinChat(data, socket) {
        const chatId = `chat${data.roomId}`;
        socket.join(chatId);
        this.server.to(chatId).emit('chat:join', data.message);
    }
    handleChatLeave(data, socket) {
        const chatId = `chat${data.roomId}`;
        socket.leave(chatId);
        this.server.to(chatId).emit('chat:leave', data.message);
    }
    handleChatMessage(data) {
        const chatId = `chat${data.roomId}`;
        this.server.to(chatId).emit('chat:message', data.message);
    }
    handleChatMessageLog(data) {
        const chatId = `chat${data.roomId}`;
        this.server.to(chatId).emit('chat:message_log', data.message);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('chat:join'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinChat", null);
__decorate([
    websockets_1.SubscribeMessage('chat:leave'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatLeave", null);
__decorate([
    websockets_1.SubscribeMessage('chat:message'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatMessage", null);
__decorate([
    websockets_1.SubscribeMessage('chat:message_log'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatMessageLog", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: '/chat' })
], ChatGateway);
exports.ChatGateway = ChatGateway;


/***/ }),
/* 35 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/websockets");;

/***/ }),
/* 36 */
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");;

/***/ }),
/* 37 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameGateway = void 0;
const websockets_1 = __webpack_require__(35);
const socket_io_1 = __webpack_require__(36);
const gameAction_dto_1 = __webpack_require__(28);
const game_service_1 = __webpack_require__(14);
let GameGateway = class GameGateway {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async handleGameJoin(gameActionDto, socket) {
        const gameId = `game${gameActionDto.roomId}`;
        const game = await this.gameService.addNewUser(gameActionDto);
        socket.join(gameId);
        this.server.to(gameId).emit('game:join', game);
    }
    async handleGamePick(gameActionDto, socket) {
        const gameId = `game${gameActionDto.roomId}`;
        const game = await this.gameService.setPlayerPicked(gameActionDto);
        if (game.pickedPlayers.length === 2) {
            this.server.to(gameId).emit('game:pick', game);
        }
        else {
            socket.emit('game:pick', game);
        }
    }
    async handleGameOver(gameActionDto) {
        const gameId = `game${gameActionDto.roomId}`;
        this.server.to(gameId).emit('game:over');
    }
    async handleGameReady(gameActionDto, socket) {
        const gameId = `game${gameActionDto.roomId}`;
        const game = await this.gameService.setPlayerReady(gameActionDto);
        if (game.readyPlayers.length === 2) {
            this.server.to(gameId).emit('game:ready', game);
        }
        else {
            socket.emit('game:ready', game);
        }
    }
    async handleGameMove(gameActionDto) {
        const gameId = `game${gameActionDto.roomId}`;
        const game = await this.gameService.changePlayerMove(gameActionDto);
        this.server.to(gameId).emit('game:move', game);
    }
    async handleGameRestart(gameActionDto) {
        const gameId = `game${gameActionDto.roomId}`;
        const game = await this.gameService.restartGame(gameActionDto);
        this.server.to(gameId).emit('game:restart', game);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], GameGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('game:join'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof gameAction_dto_1.GameActionDTO !== "undefined" && gameAction_dto_1.GameActionDTO) === "function" ? _b : Object, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameJoin", null);
__decorate([
    websockets_1.SubscribeMessage('game:pick'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof gameAction_dto_1.GameActionDTO !== "undefined" && gameAction_dto_1.GameActionDTO) === "function" ? _d : Object, typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGamePick", null);
__decorate([
    websockets_1.SubscribeMessage('game:over'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof gameAction_dto_1.GameActionDTO !== "undefined" && gameAction_dto_1.GameActionDTO) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameOver", null);
__decorate([
    websockets_1.SubscribeMessage('game:ready'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof gameAction_dto_1.GameActionDTO !== "undefined" && gameAction_dto_1.GameActionDTO) === "function" ? _g : Object, typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameReady", null);
__decorate([
    websockets_1.SubscribeMessage('game:move'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof gameAction_dto_1.GameActionDTO !== "undefined" && gameAction_dto_1.GameActionDTO) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameMove", null);
__decorate([
    websockets_1.SubscribeMessage('game:restart'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof gameAction_dto_1.GameActionDTO !== "undefined" && gameAction_dto_1.GameActionDTO) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameRestart", null);
GameGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: '/game' }),
    __metadata("design:paramtypes", [typeof (_l = typeof game_service_1.GameService !== "undefined" && game_service_1.GameService) === "function" ? _l : Object])
], GameGateway);
exports.GameGateway = GameGateway;


/***/ }),
/* 38 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LobbyGateway = void 0;
const common_1 = __webpack_require__(8);
const websockets_1 = __webpack_require__(35);
const socket_io_1 = __webpack_require__(36);
const rooms_service_1 = __webpack_require__(12);
const game_service_1 = __webpack_require__(14);
let LobbyGateway = class LobbyGateway {
    constructor(roomsService, gameService) {
        this.roomsService = roomsService;
        this.gameService = gameService;
        this.logger = new common_1.Logger('LobbyGateway');
    }
    handleUserJoin(data, socket) {
        socket.broadcast.emit('user:join', data);
    }
    handleCreateRoom(data, socket) {
        this.logger.log('room:create');
        socket.broadcast.emit('room:create', data);
    }
    async handleAddUser(data) {
        try {
            const updatedRoom = await this.roomsService.addUser(data.id, data.username);
            this.server.emit('room:add_user', updatedRoom);
        }
        catch (error) {
            console.error(error);
        }
    }
    async handleRemoveUser(data, socket) {
        console.log('remove_user', data.username);
        try {
            const updatedRoom = await this.roomsService.removeUser(data.id, data.username);
            const game = await this.gameService.removePlayerFromGame({
                roomId: data.id,
                username: data.username,
            });
            this.server.emit('room:remove_user', { room: updatedRoom, game });
        }
        catch (error) {
            console.error(error);
        }
    }
    afterInit(server) {
        this.logger.log('init');
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], LobbyGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('user:join'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], LobbyGateway.prototype, "handleUserJoin", null);
__decorate([
    websockets_1.SubscribeMessage('room:create'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof rooms_service_1.Room !== "undefined" && rooms_service_1.Room) === "function" ? _c : Object, typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], LobbyGateway.prototype, "handleCreateRoom", null);
__decorate([
    websockets_1.SubscribeMessage('room:add_user'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LobbyGateway.prototype, "handleAddUser", null);
__decorate([
    websockets_1.SubscribeMessage('room:remove_user'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], LobbyGateway.prototype, "handleRemoveUser", null);
LobbyGateway = __decorate([
    websockets_1.WebSocketGateway(),
    __metadata("design:paramtypes", [typeof (_f = typeof rooms_service_1.RoomsService !== "undefined" && rooms_service_1.RoomsService) === "function" ? _f : Object, typeof (_g = typeof game_service_1.GameService !== "undefined" && game_service_1.GameService) === "function" ? _g : Object])
], LobbyGateway);
exports.LobbyGateway = LobbyGateway;


/***/ }),
/* 39 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGateway = void 0;
const websockets_1 = __webpack_require__(35);
const socket_io_1 = __webpack_require__(36);
let RoomGateway = class RoomGateway {
    handleJoinRoom(data, socket) {
        socket.join(data.roomId);
        this.server.to(data.roomId).emit('room:join', data.username);
    }
    handleLeaveRoom(data, socket) {
        socket.leave(data.roomId);
        this.server.to(data.roomId).emit('room:leave');
    }
    handlePrivateRoom(data) {
        this.server.to(data.roomId).emit('room:private', data.username);
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], RoomGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('room:join'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleJoinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('room:leave'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleLeaveRoom", null);
__decorate([
    websockets_1.SubscribeMessage('room:private'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handlePrivateRoom", null);
RoomGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: '/room' })
], RoomGateway);
exports.RoomGateway = RoomGateway;


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotFoundExceptionFilter = void 0;
const common_1 = __webpack_require__(8);
const path_1 = __webpack_require__(31);
let NotFoundExceptionFilter = class NotFoundExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.sendFile(path_1.join(__dirname, '..', 'client/404/404.html'));
    }
};
NotFoundExceptionFilter = __decorate([
    common_1.Catch(common_1.NotFoundException)
], NotFoundExceptionFilter);
exports.NotFoundExceptionFilter = NotFoundExceptionFilter;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("3d71cd35a5c3d137626b")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: currentChildModule !== moduleId,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				registeredStatusHandlers[i].call(null, newStatus);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			setStatus("check");
/******/ 			return __webpack_require__.hmrM().then(function (update) {
/******/ 				if (!update) {
/******/ 					setStatus(applyInvalidatedModules() ? "ready" : "idle");
/******/ 					return null;
/******/ 				}
/******/ 		
/******/ 				setStatus("prepare");
/******/ 		
/******/ 				var updatedModules = [];
/******/ 				blockingPromises = [];
/******/ 				currentUpdateApplyHandlers = [];
/******/ 		
/******/ 				return Promise.all(
/******/ 					Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 						promises,
/******/ 						key
/******/ 					) {
/******/ 						__webpack_require__.hmrC[key](
/******/ 							update.c,
/******/ 							update.r,
/******/ 							update.m,
/******/ 							promises,
/******/ 							currentUpdateApplyHandlers,
/******/ 							updatedModules
/******/ 						);
/******/ 						return promises;
/******/ 					},
/******/ 					[])
/******/ 				).then(function () {
/******/ 					return waitForBlockingPromises(function () {
/******/ 						if (applyOnUpdate) {
/******/ 							return internalApply(applyOnUpdate);
/******/ 						} else {
/******/ 							setStatus("ready");
/******/ 		
/******/ 							return updatedModules;
/******/ 						}
/******/ 					});
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				setStatus("abort");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			// handle errors in accept handlers and self accepted module load
/******/ 			if (error) {
/******/ 				setStatus("fail");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw error;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			if (queuedInvalidatedModules) {
/******/ 				return internalApply(options).then(function (list) {
/******/ 					outdatedModules.forEach(function (moduleId) {
/******/ 						if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 					});
/******/ 					return list;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			setStatus("idle");
/******/ 			return Promise.resolve(outdatedModules);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					module.hot._selfAccepted &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			}).catch(function(err) { if(err.code !== "MODULE_NOT_FOUND") throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;