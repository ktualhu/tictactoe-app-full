exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 40:
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameGateway = void 0;
const websockets_1 = __webpack_require__(37);
const socket_io_1 = __webpack_require__(38);
const gameAction_dto_1 = __webpack_require__(27);
const game_service_1 = __webpack_require__(28);
const lobby_gateway_1 = __webpack_require__(39);
const curOptions = Object.assign(Object.assign({}, lobby_gateway_1.options), { namespace: '/game' });
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
    async handleGameLeave(gameActionDto, socket) {
        const gameId = `game${gameActionDto.roomId}`;
        const game = await this.gameService.removePlayerFromGame(gameActionDto);
        socket.leave(gameId);
        this.server.to(gameId).emit('game:leave', game);
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
__decorate([
    websockets_1.SubscribeMessage('game:leave'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof gameAction_dto_1.GameActionDTO !== "undefined" && gameAction_dto_1.GameActionDTO) === "function" ? _l : Object, typeof (_m = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _m : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameLeave", null);
GameGateway = __decorate([
    websockets_1.WebSocketGateway({ namespace: '/game' }),
    __metadata("design:paramtypes", [typeof (_o = typeof game_service_1.GameService !== "undefined" && game_service_1.GameService) === "function" ? _o : Object])
], GameGateway);
exports.GameGateway = GameGateway;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("47a231fe795c4f952537")
/******/ })();
/******/ 
/******/ }
;