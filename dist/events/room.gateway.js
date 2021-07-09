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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const lobby_gateway_1 = require("./lobby.gateway");
const curOptions = Object.assign(Object.assign({}, lobby_gateway_1.options), { namespace: '/room' });
let RoomGateway = class RoomGateway {
    handleJoinRoom(data, socket) {
        socket.join(data.roomId);
        this.server.to(data.roomId).emit('room:join', data.username);
    }
    handleLeaveRoom(data, socket) {
        socket.leave(data.roomId);
        this.server.to(data.roomId).emit('room:leave', data.username);
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
    __param(0, websockets_1.MessageBody()), __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleJoinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('room:leave'),
    __param(0, websockets_1.MessageBody()), __param(1, websockets_1.ConnectedSocket()),
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
    websockets_1.WebSocketGateway(5001, curOptions)
], RoomGateway);
exports.RoomGateway = RoomGateway;
//# sourceMappingURL=room.gateway.js.map