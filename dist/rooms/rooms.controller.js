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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const isauth_guard_1 = require("../auth/guards/isauth.guard");
const createRoom_dto_1 = require("./dto/createRoom.dto");
const joinRoom_dto_1 = require("./dto/joinRoom.dto");
const rooms_service_1 = require("./rooms.service");
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
            throw new common_1.HttpException('Rooms array is empty or room with current id does not exist!', common_1.HttpStatus.NOT_FOUND);
        }
        return await res
            .cookie('room_id', id)
            .json(this.roomsService.getRoomById(id));
    }
    async joinRoom(joinRoom, res) {
        const room = await this.roomsService.getRoomById(joinRoom.roomId);
        if (room && room.roomPassword === joinRoom.password) {
            return await res.cookie('room_id', joinRoom.roomId).json(room);
        }
        else
            throw new common_1.HttpException('Wrong password!', common_1.HttpStatus.NOT_ACCEPTABLE);
    }
    async leaveRoom(res) {
        return res.clearCookie('room_id').send();
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getAllRooms", null);
__decorate([
    common_1.Post('/new'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRoom_dto_1.CreateRoomDTO]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "createRoom", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getRoomById", null);
__decorate([
    common_1.Post('/join'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [joinRoom_dto_1.JoinRoomDTO, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "joinRoom", null);
__decorate([
    common_1.Post('/leave'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "leaveRoom", null);
RoomsController = __decorate([
    common_1.UseGuards(isauth_guard_1.IsAuthGuard),
    common_1.Controller('/rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
exports.RoomsController = RoomsController;
//# sourceMappingURL=rooms.controller.js.map