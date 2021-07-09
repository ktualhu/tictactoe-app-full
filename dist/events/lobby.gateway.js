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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LobbyGateway = exports.options = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const rooms_service_1 = require("../rooms/rooms.service");
exports.options = {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
};
let LobbyGateway = class LobbyGateway {
    constructor(roomsService) {
        this.roomsService = roomsService;
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
        try {
            const updatedRoom = await this.roomsService.removeUser(data.id, data.username);
            socket.broadcast.emit('room:remove_user', updatedRoom);
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
    __metadata("design:paramtypes", [rooms_service_1.Room, typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object]),
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
    __metadata("design:paramtypes", [Object, typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], LobbyGateway.prototype, "handleRemoveUser", null);
LobbyGateway = __decorate([
    websockets_1.WebSocketGateway(5001, exports.options),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], LobbyGateway);
exports.LobbyGateway = LobbyGateway;
//# sourceMappingURL=lobby.gateway.js.map