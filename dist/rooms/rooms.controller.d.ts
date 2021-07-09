import { Request, Response } from 'express';
import { CreateRoomDTO } from './dto/createRoom.dto';
import { JoinRoomDTO } from './dto/joinRoom.dto';
import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    getAllRooms(req: Request): Promise<{
        rooms: import("./rooms.service").Room[];
        room_id: any;
    } | {
        rooms: import("./rooms.service").Room[];
        room_id?: undefined;
    }>;
    createRoom(createRoom: CreateRoomDTO): Promise<import("./rooms.service").Room>;
    getRoomById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    joinRoom(joinRoom: JoinRoomDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    leaveRoom(res: Response): Promise<Response<any, Record<string, any>>>;
}
