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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = exports.RoomUpdatePrefix = exports.Room = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const users_service_1 = require("../users/users.service");
const game_service_1 = require("../games/game.service");
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
    __metadata("design:paramtypes", [game_service_1.GameService])
], RoomsService);
exports.RoomsService = RoomsService;
//# sourceMappingURL=rooms.service.js.map