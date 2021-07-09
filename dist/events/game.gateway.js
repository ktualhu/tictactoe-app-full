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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const gameAction_dto_1 = require("../games/dto/gameAction.dto");
const game_service_1 = require("../games/game.service");
const lobby_gateway_1 = require("./lobby.gateway");
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
    __metadata("design:paramtypes", [gameAction_dto_1.GameActionDTO, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameJoin", null);
__decorate([
    websockets_1.SubscribeMessage('game:pick'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameAction_dto_1.GameActionDTO, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGamePick", null);
__decorate([
    websockets_1.SubscribeMessage('game:over'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameAction_dto_1.GameActionDTO]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameOver", null);
__decorate([
    websockets_1.SubscribeMessage('game:ready'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameAction_dto_1.GameActionDTO, typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameReady", null);
__decorate([
    websockets_1.SubscribeMessage('game:move'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameAction_dto_1.GameActionDTO]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameMove", null);
__decorate([
    websockets_1.SubscribeMessage('game:restart'),
    __param(0, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameAction_dto_1.GameActionDTO]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameRestart", null);
__decorate([
    websockets_1.SubscribeMessage('game:leave'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gameAction_dto_1.GameActionDTO, typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGameLeave", null);
GameGateway = __decorate([
    websockets_1.WebSocketGateway(5001, curOptions),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map